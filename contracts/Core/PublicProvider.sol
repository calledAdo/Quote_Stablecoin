//SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {OwnableERC20} from "./OwnableERC20.sol";
import {Provider} from "./Provider.sol";

/**
 * @title The Public Provider contract
 *
 * @author CalledDAO
 * @notice main interface for minting and buring QUOTE and LETH in the public pool
 */
contract PublicProvider is Provider {
    address public immutable LETH_TOKEN;

    /**
     * @notice events for minting and burning LETH
     * @param account The account or user minting or burning LETH
     *
     * @param amount The amount minted or burned;
     */

    event MintedLETH(address account, uint amount);
    event BurnedLETH(address account, uint256 amount);

    error AboveMaxCollateralMultiplier();

    constructor(
        address priceFeed_,
        address globalState_,
        address quote_token_
    ) Provider(priceFeed_, globalState_, quote_token_) {
        LETH_TOKEN = address(new OwnableERC20("LONGED ETHEREUM", "LETH", 18));
    }

    /**
     * @dev if either AboveMaxMultiplier or BelowMinMultiplier it reverts throwing the corresponding error
     * @param amountIn amount of asset going in
     *
     * @param mint true if converting from ETH to LETH
     */

    function lethXETHConverter(
        uint amountIn,
        bool mint
    ) external view returns (uint) {
        if (mint) {
            uint amountOut = address(this).balance == 0
                ? _updateLETH(amountIn, amountIn, true)
                : _updateLETH(amountIn, address(this).balance, true);
            return amountOut;
        } else {
            return _updateLETH(amountIn, address(this).balance, false);
        }
    }

    /**
     *
     * @notice functions for minting QUOTE
     * @dev the msg.value is taken as the amountIn;
     *
     */
    function mintQUOTE() external payable nonReentrant {
        require(msg.value != 0);
        (uint24 minMultiplier, , uint24 fee) = _globalState
            .publicProviderDetails();
        uint amountAfterFees = msg.value - calcPercent(msg.value, fee);
        _mintQUOTE(msg.sender, amountAfterFees, minMultiplier, 0);
    }

    /**
     *@param amountIn The amount of QUOTE to burn
     * @notice functions for minting QUOTE
     *
     */

    function burnQUOTE(uint amountIn) external nonReentrant {
        require(amountIn != 0);
        address sender = msg.sender;
        uint amountOut = _burnQUOTE(sender, amountIn);
        (, , uint24 fee) = _globalState.publicProviderDetails();
        uint amountAfterFees = amountOut - calcPercent(amountOut, fee);
        payable(msg.sender).transfer(amountAfterFees);
    }

    /**
     *
     * @notice functions for minting LETH
     * @dev
     * Note:
     * the msg.value is taken as the amountIn;
     * function reverts if transaction causes pool to be AboveMaxMultiplier;
     *
     *
     */
    function mintLETH() external payable nonReentrant {
        require(msg.value != 0);
        uint amountOut = _updateLETH(msg.value, address(this).balance, true);
        OwnableERC20(LETH_TOKEN).mint(msg.sender, amountOut);
    }

    /**
     *@param amountIn The amount of LETH to burn
     * @notice functions for minting QUOTE
     *
     * @dev
     * NOTE;
     * functions reverts if transaction results in pool being BelowMinMutiplier;
     *
     */
    function burnLETH(uint amountIn) external nonReentrant {
        require(amountIn != 0);
        uint amountOut = _updateLETH(amountIn, address(this).balance, false);
        OwnableERC20(LETH_TOKEN).burn(msg.sender, amountIn);
        payable(msg.sender).transfer(amountOut);
    }

    /**
     *
     * @param amountIn The amountIn
     *
     *
     * @param poolBalance The current balance of the pool
     * @param mint true if minting LETH and false otherwise
     *
     * @dev function reverts if transaction leads to pool balance being  BelowMinMutplier or AboveMinMultiplier
     *
     */
    function _updateLETH(
        uint amountIn,
        uint poolBalance,
        bool mint
    ) internal view returns (uint) {
        if (amountIn == poolBalance) {
            return amountIn;
        }
        uint amountOut;
        uint lethTotalSupply = IERC20(LETH_TOKEN).totalSupply();
        (int price, uint8 decimal) = _priceFeed.getPrice();
        uint sufficientCollateral = _sufficientCollateral(0, price, decimal);
        uint excessCollateral = poolBalance - sufficientCollateral;
        (uint24 minMultiplier, uint24 maxMultiplier, ) = _globalState
            .publicProviderDetails();
        if (mint) {
            amountOut =
                (lethTotalSupply * amountIn) /
                (excessCollateral - amountIn);

            if (totalQuoteMinted == 0) {
                return amountOut;
            }

            //checks if the transaction results in collateral upper cap being exceeded
            //reverts if that is the case
            if (
                excessCollateral >
                (maxMultiplier * sufficientCollateral) / (10 ** 6)
            ) {
                revert AboveMaxCollateralMultiplier();
            }
        } else {
            amountOut = (excessCollateral * amountIn) / (lethTotalSupply);
            if (totalQuoteMinted == 0) {
                return amountOut;
            }
            uint excessCollateralAfter = excessCollateral - amountOut;
            //Checks that the resulting excess collateral is not less collateral lower cap
            if (
                excessCollateralAfter <
                (minMultiplier * sufficientCollateral) / (10 ** 6)
            ) {
                revert BelowMinCollateralMultiplier();
            }
        }
        return amountOut;
    }
}
