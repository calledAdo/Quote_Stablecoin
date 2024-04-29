//SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;

import {PositionMath} from "../Libraries/PositionMath.sol";
import {ProviderMath} from "../Libraries/ProviderMath.sol";
import {PriceMath} from "../Libraries/PriceMath.sol";
//
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IWrappedTokenGatewayV3} from "../Interface/IWrappedTokenGatewayV3.sol";

///

import {Provider} from "./Provider.sol";
import {IERC20, OwnableERC20} from "./OwnableERC20.sol";

/**
 * @title Private Provider  contract
 *
 * @author @CalledDAO
 * @notice base contract containg all logic for Private Providers
 * inherits from the Provider contract and the Ownable contract
 */
contract PrivateProvider is Provider, Ownable {
    using PositionMath for PositionMath.DebtPosition;
    using PriceMath for uint;
    using ProviderMath for uint;

    struct PositionDetails {
        //The user debt position of reference
        PositionMath.DebtPosition position;
        //The percentage over collateralization
        int24 collateralizationPerc;
        //The current approximate liquidation price as at this moment
        uint liquidationPrice;
        //The provider address for that position
        address providerAddress;
    }

    struct OpenPositionParams {
        //amount of collateral to utilise
        uint24 percentUtilization;
        //Targets are set to mitigate front-running attacks
        //target InteterestRate   which if exceeded transaction should fail
        uint24 targetInterestRate;
        //target min drawdown which if exceeded  transaction should fail
        int24 targetMinDrawdown;
        //target min duration which  is exceeded transaction should fail
        uint targetMinDuration;
    }

    struct State {
        //current Interest rate for opening positions
        uint24 currentInterestRate;
        //current minimum  drawdown
        //i.e the minimum percentage over collateralization allowed for opening positions
        int24 currentMinDrawdown;
        //current minimum duration  for opening positions
        //positions can't be closed until that time elapses
        uint currentMinDuration;
        //isPaused is utlised for restricting actions on this
        bool isPaused;
    }

    struct ProviderDetails {
        string providerName;
        //The State of the provider
        State providerState;
        // The max amount of Quote that can be minted;
        uint maxQuoteMintable;
    }

    uint32 constant SECONDS_PER_YEAR = 31536000;
    address public immutable DEBT_TOKEN;
    IWrappedTokenGatewayV3 immutable aaveGateway;
    string providerName;
    State providerState;
    uint netUnutilisedCollateral;

    mapping(address user => PositionMath.DebtPosition userPosition) userToDebtPosition;
    //All liquidated users would have to manually withdraw their remaining asset after a liquidation event
    mapping(address user => uint amountOwed) userToAmountOwed;

    event OpenedPosition(
        address account,
        uint collateralSize,
        uint quoteMinted
    );
    event ClosePosition(address account, uint collateralSize, uint quoteBurned);
    event AddedCollateral(address account, uint collateralDelta);
    event PositionLiquidated(
        address owner,
        address liquidator,
        PositionMath.DebtPosition position
    );

    error OverUtilizationOfCollateral();
    error TargetNotFulfilled();
    error PositionStillSafe();
    error DurationNotFulfullled();

    constructor(
        string memory name,
        address owner,
        address priceFeed_,
        address globalState_,
        address quoteToken,
        address aaveGateway_,
        address debtToken
    ) payable Provider(priceFeed_, globalState_, quoteToken) Ownable(owner) {
        providerName = name;
        DEBT_TOKEN = debtToken;
        aaveGateway = IWrappedTokenGatewayV3(aaveGateway_);
    }

    //////////
    // VIEW FUNCTIONS
    function getAccountPositionDetails(
        address account
    ) external view returns (PositionDetails memory userPositionDetails) {
        return _getAccountPositionDetails(account);
    }

    function getProviderDetails()
        external
        view
        returns (ProviderDetails memory providerDetails)
    {
        return _getProviderDetails();
    }

    /////////

    /////////////
    //ADMIN FUNCTIONS

    /**
     * @notice These functions can only be  called by Owner
     *
     *
     *
     *
     *
     *
     *
     */

    function withdraw(uint amount, address to) external onlyOwner {
        (int price, uint8 decimal) = _priceFeed.getPrice();
        uint amountAfter = address(this).balance - amount;
        (uint24 minMultiplier, , , ) = _globalState.privateProviderDetails();
        uint sufficientCollateral = _sufficientCollateral(
            totalQuoteMinted,
            price,
            decimal
        );
        uint excessCollateral = amountAfter - sufficientCollateral;
        if (
            excessCollateral <
            (sufficientCollateral * minMultiplier) / BASIS_POINT
        ) {
            revert BelowMinCollateralMultiplier();
        }

        _transfer(to, amount);
    }

    function setState(State memory newState) external onlyOwner {
        providerState = newState;
    }

    function depositToAave(uint amount) external onlyOwner {
        _depositToAave(amount);
    }

    function withdrawFromAave(uint amount) external onlyOwner {
        _withdrawFromAave(amount);
    }

    function liquidateExpiredPosition(address user) external onlyOwner {
        //Checks to ensure that the owner has no position already
        assert(userToDebtPosition[msg.sender].collateralSize == 0);
        //stores a mock position for the owner
        userToDebtPosition[msg.sender] = userToDebtPosition[user];

        //liquidates that mock position
        uint amountAfterInterest = closePosition();
        uint sufficientCollateral = _updateQUOTE(
            userToDebtPosition[msg.sender].quoteMinted,
            false,
            0,
            0
        );

        //Checks if amountAfterInterest is more than sufficientCollateral and if so sends the position owner the remainder

        if (amountAfterInterest > sufficientCollateral) {
            _transfer(user, amountAfterInterest - sufficientCollateral);
        }
        //deletes the original position
        delete userToDebtPosition[user];
    }

    //////////////

    /////////////
    //EXTERNAL FUNCTIONS
    /**
     *@notice function for opening Positions
     * @param params position paramters for opening a position includes
     *   percentUtilization; The  amount of collateral deposited to utilise
    
         targetInterestRate; Tbe maximum interest rate such that in which if exceeded transaction should fail
         targetMinDrawDrown; The minimum drawdown such that if exceeded (i.e if currentMinDrawdown is greater than) 
         transaction should fail
      Note:Targets are set to prevent frontrunning attacks from malicious providers 
         
     *
     *
     */
    function openPosition(
        OpenPositionParams memory params
    ) public payable nonReentrant {
        address account = msg.sender;
        //requires that amount in is not zero and provider is not  paused
        require(
            msg.value != 0 &&
                !providerState.isPaused &&
                userToDebtPosition[account].collateralSize == 0
        );

        //Opens a debt Position and mint the equivalent worth of  QUOTE of utilised asset
        uint amountOut = _openCDP(params, msg.value, account);

        //Saves the position in an address to user position
        userToDebtPosition[account] = PositionMath.DebtPosition({
            unUtilisedCollateral: calcPercent(
                msg.value,
                BASIS_POINT - params.percentUtilization
            ),
            collateralSize: msg.value,
            quoteMinted: amountOut,
            interestRate: providerState.currentInterestRate,
            minDrawdown: providerState.currentMinDrawdown,
            lastUpdatedTimestamp: block.timestamp,
            positionDuration: providerState.currentMinDuration
        });

        emit OpenedPosition(account, msg.value, amountOut);
    }

    /**
     *
     * @notice function for closing Positions ,it should only be called by the account owner;
     *
     */

    function closePosition()
        public
        nonReentrant
        returns (uint amountAfterInterest)
    {
        address account = msg.sender;
        PositionMath.DebtPosition memory userPosition = userToDebtPosition[
            account
        ];

        if (
            block.timestamp - userPosition.lastUpdatedTimestamp <
            userPosition.positionDuration
        ) {
            revert DurationNotFulfullled();
        }
        //Closes the collateralized debt position by burning the QUOTE minted;
        (, amountAfterInterest) = _closeCDP(userPosition, account);

        //deletes the position
        delete userToDebtPosition[account];

        //sends  ether to account
        /**
         * @dev Not an attack vector because it only restricts user from closing their position
         * //which the makes it prone to liquidation bu liquidators
         *
         * */
        _transfer(account, amountAfterInterest);
        emit ClosePosition(
            account,
            userPosition.collateralSize,
            userPosition.quoteMinted
        );
        return amountAfterInterest;
    }

    /**
     *
     * @notice function for depositing more collaetral
     * @dev accumulated fees are first removed before collateral is topped up and
     * the last updated time is adjusted to current timestamp
     * the duration is also adjusted
     *
     *
     */
    function topUpCollateral(address account) public payable nonReentrant {
        require(msg.value != 0);
        PositionMath.DebtPosition storage userPosition = userToDebtPosition[
            account
        ];

        //Updates the collateralSize by removing the accumulated interest and then adding the top up
        userPosition.collateralSize =
            (userPosition.collateralSize + msg.value) -
            PositionMath.calcInterest(userPosition);

        //emit event
        emit AddedCollateral(account, msg.value);
        //Updates the last updated time to current block timestamp and updates the duration
        userPosition.positionDuration =
            userPosition.positionDuration -
            block.timestamp;
        userPosition.lastUpdatedTimestamp = block.timestamp;

        netUnutilisedCollateral += msg.value;
    }

    /**
     *
     * @param positionOwner The owner of the position to be liquidated
     * @dev users whose positions are liquidated would withdraw the remaining collateral manually
     * This is done to avoid possible attack vectors like sending eth to a destroyed contract address
     *
     *
     */
    function liquidatePosition(address positionOwner) public nonReentrant {
        address liquidator = msg.sender;

        PositionMath.DebtPosition memory userPosition = userToDebtPosition[
            positionOwner
        ];

        //closes the CDP and returns the amount after withdrawing interest with the liquidator should receive
        //the amount for QUOTE burned and the liquidation penalty fee
        (uint liquidatorReceives, uint amountAfterInterest) = _liquidateCDP(
            userPosition,
            liquidator
        );

        //amount remaining is calculated as the difference of the amount after interest and the amount that liquidator receives

        uint remainingCollateral;
        if (amountAfterInterest > liquidatorReceives) {
            remainingCollateral = amountAfterInterest - liquidatorReceives;
        }

        userToAmountOwed[positionOwner] = remainingCollateral;

        netUnutilisedCollateral += remainingCollateral;

        delete userToDebtPosition[positionOwner];
        //Not an attck vector because liquidator not being able to receive ETH can only revert this current transaction and not others
        _transfer(liquidator, liquidatorReceives);

        emit PositionLiquidated(positionOwner, liquidator, userPosition);
    }

    //////////////

    ////////////////
    //INTERNAL FUNCTIONS

    /**
     *
     * @param params the paramters for opening the position (see openPosition)
     * @param collateralSize the initial collateral size
     * @param account the position owner
     *
     *
     * @return  amountOut the amount of QUOTE minted
     *
     */

    function _openCDP(
        OpenPositionParams memory params,
        uint collateralSize,
        address account
    ) internal returns (uint amountOut) {
        //Gets the min multiplier and maxCollateralUtilization from the Global State(governing contract)
        (
            uint24 minMultiplier,
            uint24 maxCollateralUtilisation,
            ,

        ) = _globalState.privateProviderDetails();
        //Checks that percent Utilization is not greater than the max collateral utlisation else reverts
        if (params.percentUtilization > maxCollateralUtilisation) {
            revert OverUtilizationOfCollateral();
        }

        //Checks that targets are met else reverts
        if (
            providerState.currentInterestRate > params.targetInterestRate ||
            providerState.currentMinDrawdown > params.targetMinDrawdown ||
            providerState.currentMinDuration > params.targetMinDuration
        ) {
            revert TargetNotFulfilled();
        }

        //Gets the amount being utilised
        uint amountUtilised = calcPercent(
            collateralSize,
            params.percentUtilization
        );
        netUnutilisedCollateral += collateralSize - amountUtilised;
        //mints the equivalent QUOTE and return the amount of QUOTE minted
        amountOut = _mintQUOTE(
            account,
            amountUtilised,
            minMultiplier,
            netUnutilisedCollateral
        );
        return amountOut;
    }

    /*
     *
     * @param userPosition the position to close
     *
     * @param account the owner of the position
     */
    function _closeCDP(
        PositionMath.DebtPosition memory userPosition,
        address account
    ) internal returns (uint sufficentCollateral, uint amountafterInterest) {
        netUnutilisedCollateral -= userPosition.unUtilisedCollateral;
        //Burns the totalQuoteMinted;
        sufficentCollateral = _burnQUOTE(account, userPosition.quoteMinted);
        //Gets the amountRemaining after interest has been paid
        amountafterInterest =
            userPosition.collateralSize -
            userPosition.calcInterest();
        return (sufficentCollateral, amountafterInterest);
    }

    /**
     *@dev amountAfterInterest might be zero in cases of great drawdown 
     in such cases the provider is penalised by taking the liquidator fee from them instead     *
     *
     */

    function _liquidateCDP(
        PositionMath.DebtPosition memory userPosition,
        address liquidator
    ) internal returns (uint liquidatorReceives, uint amountAfterInterest) {
        //Checks if position is to be liquidated and gets the liquidation penalty fee
        (bool toLiquidate, uint24 penaltyFee) = _toLiquidate(userPosition);

        //reverts if position is not to be liquidated
        if (!toLiquidate) {
            revert PositionStillSafe();
        }
        uint sufficientCollateral;
        //sufficeint collateral is the amount of ETH equal in value to the specified QUOTE amount
        (sufficientCollateral, amountAfterInterest) = _closeCDP(
            userPosition,
            liquidator
        );

        //Liquidator  receives the equivalent of ETH for the QUOTE bunred
        // and also the penalty fee is deducted as a prcentage of the amountRemaining after fees
        liquidatorReceives =
            sufficientCollateral +
            calcPercent(amountAfterInterest, penaltyFee);
        return (liquidatorReceives, amountAfterInterest);
    }

    //////////////

    ///////////////////
    //PRIVATE FUNCTIONS

    function _getAccountPositionDetails(
        address account
    ) public view returns (PositionDetails memory position) {
        PositionMath.DebtPosition memory userPosition = userToDebtPosition[
            account
        ];
        (, , int24 globalMaxDrawdown, ) = _globalState.privateProviderDetails();
        (int price, uint8 decimal) = _priceFeed.getPrice();
        PositionDetails memory userPositionDetails = PositionDetails({
            position: userPosition,
            collateralizationPerc: userPosition.percentageOverCollateralization(
                    price,
                    decimal
                ),
            liquidationPrice: userPosition.calcLiquidationPrice(
                globalMaxDrawdown
            ),
            providerAddress: address(this)
        });
        return userPositionDetails;
    }

    function _getProviderDetails()
        private
        view
        returns (ProviderDetails memory providerDetails)
    {
        State memory currentState = providerState;
        uint maxQuoteMintable;
        (int price, uint8 decimal) = _priceFeed.getPrice();
        (uint24 minMultiplier, , , ) = _globalState.privateProviderDetails();
        uint providerValue = address(this).balance.computeQUOTE(price, decimal);
        uint maxAmount = (providerValue * BASIS_POINT) /
            (BASIS_POINT + minMultiplier);
        int amountRemaining = int(maxAmount) - int(totalQuoteMinted);
        if (amountRemaining > 0) {
            maxQuoteMintable = uint(amountRemaining);
        }
        return
            ProviderDetails({
                providerName: providerName,
                providerState: currentState,
                maxQuoteMintable: maxQuoteMintable
            });
    }

    /**
     *@dev This function checks if the position should be liquidated by checking
       //if the position drawdown or the global min draw down has been exceeded
     * @param userPosition the position of reference
     *
     *
     * @return //true if to be  liquidated else returns false
     * @return liquidationFee the liquidation fee //Only useful if position is to be liquidated
     */

    function _toLiquidate(
        PositionMath.DebtPosition memory userPosition
    ) private view returns (bool, uint24 liquidationFee) {
        (, , int24 globalMaxDrawdown, uint24 fee) = _globalState
            .privateProviderDetails();
        (int price, uint8 decimal) = _priceFeed.getPrice();
        int24 overColletaralPerc = userPosition.percentageOverCollateralization(
            price,
            decimal
        );

        //Checks if the position collateralPerc(see PositionMath for reference) has gone below
        //the preset maxDrawdown or the globalDrawDown(in some special cases)
        //If so ,the poosition should be liquidated;
        if (
            overColletaralPerc < userPosition.minDrawdown ||
            overColletaralPerc < globalMaxDrawdown
        ) {
            liquidationFee = fee;
            return (true, liquidationFee);
        }
        return (false, 0);
    }

    function _depositToAave(uint amount) private {
        uint amountRemainingAfter = address(this).balance - amount;
        (int price, uint8 decimal) = _priceFeed.getPrice();
        uint sufficientCollateral = _sufficientCollateral(
            totalQuoteMinted,
            price,
            decimal
        );
        //amount remaining must be greater than 25% of the sufficient collaytreal;
        require(
            amountRemainingAfter >=
                calcPercent(sufficientCollateral, 25 * (10 ** 4)),
            "Limit"
        );
        //address(0) serves no purpose
        aaveGateway.depositETH(address(0), address(this), 0);
    }

    function _withdrawFromAave(uint amount) private {
        aaveGateway.withdrawETH(address(0), amount, address(this));
    }

    /**
     * @notice function that sends  out ETH or debt token( in cases of default) or  both
     * @param user the receiver of the funds
     *
     *
     * @param amount the amount to send
     */

    function _transfer(address user, uint amount) private {
        uint balance = address(this).balance;
        if (balance < amount) {
            uint excess = amount - balance;
            IERC20(DEBT_TOKEN).transfer(user, excess);
            if (balance != 0) {
                payable(user).transfer(balance);
            }
        } else {
            payable(user).transfer(amount);
        }
    }

    //////////////
}
