// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

/// @title Minter
/// @notice Core contract containing logic for minting and burning quote and STATH
import {PriceFeed} from "./PriceFeed.sol";
import {PriceMath} from "../Libraries/PriceMath.sol";

import {OwnableERC20} from "./OwnableERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Minter {
    using PriceMath for int;
    uint8 constant MIN_COLLATERAL_RATIO = 4;
    uint8 constant MAX_COLLATERAL_RATIO = 8;
    uint32 constant percent_bips = 10 ** 6;
    uint32 fee = 10 ** 4;
    bool locked;

    /// @dev dummy test variable for price fetching locally and testing
    bool dummyTest = true;
    //token addresses
    address public immutable QUOTE_TOKEN;
    address public immutable LETH_TOKEN;
    PriceFeed immutable _priceFeed;

    event MintedLETH(address account, uint amount);
    event MintedQuote(address account, uint amount);
    event BurnedQUOTE(address account, uint256 amount);
    event BurnedLETH(address account, uint256 amount);

    error InsufficientBalance(address insufficientBalance);
    error BelowMinCollateralRatio(uint currentCollateralRatio);
    error AboveMaxCollateralRatio(uint currentCollateralRatio);

    /// @dev modifier that implements and protects against re-entranncy calls into the called function
    modifier noReentrancy() {
        require(!locked, "");
        locked = true;
        _;
        locked = false;
    }

    constructor(address pricefeed_, bool dummytesting_) {
        dummyTest = dummytesting_;
        _priceFeed = PriceFeed(pricefeed_);
        QUOTE_TOKEN = address(new OwnableERC20("QUOTE TOKEN", "QUOTE"));
        LETH_TOKEN = address(new OwnableERC20("LONGED ETHEREUM TOKEN", "LETH"));
    }

    ///@notice gets the amountOut resulting from any mint or born transaction
    ///@param amountIn  the amount to be deposited or burnt
    function getEquivalent(
        uint amountIn,
        bool isquote,
        bool mint
    ) external view returns (uint256) {
        return _getEquivalent(isquote, mint, amountIn);
    }

    /** 
    ///@notice core functions for iteracting


    emits a event showing their respective actions

  **/
    function mintQUOTE() external payable noReentrancy {
        require(msg.value != 0);
        uint amountOutlessFees = _mintQUOTE(msg.value, msg.sender);
        emit MintedQuote(msg.sender, amountOutlessFees);
    }

    ///@notice function for minting LETH
    function mintLETH() external payable noReentrancy {
        require(msg.value != 0);
        uint amountOutlessFees = _mintLETH(msg.value, msg.sender);
        emit MintedLETH(msg.sender, amountOutlessFees);
    }

    ///@notice function for burning QUOTE
    function burnQUOTE(uint256 amount) external noReentrancy {
        require(amount != 0);
        uint amountOutlessFees = _burnQUOTE(amount, msg.sender);
        emit BurnedQUOTE(msg.sender, amountOutlessFees);
    }

    ///@notice function for minting LETH
    function burnLETH(uint amount) external noReentrancy {
        require(amount != 0);
        uint amountOutlessFees = _burnLETH(amount, msg.sender);
        emit BurnedLETH(msg.sender, amountOutlessFees);
    }

    ///@notice The following functions make all token transactions

    function _mintQUOTE(
        uint amountIn,
        address account
    ) private returns (uint amountOutLessFees) {
        amountOutLessFees = _getEquivalent(true, true, amountIn);
        OwnableERC20(QUOTE_TOKEN).mint(account, amountOutLessFees);
    }

    function _burnQUOTE(
        uint amountIn,
        address account
    ) private returns (uint amountOutLessFees) {
        amountOutLessFees = _getEquivalent(true, false, amountIn);
        OwnableERC20(QUOTE_TOKEN).burn(account, amountIn);
        payable(account).transfer(amountOutLessFees);
    }

    function _mintLETH(
        uint amountIn,
        address account
    ) private returns (uint amountOutLessFees) {
        amountOutLessFees = _getEquivalent(false, true, amountIn);
        OwnableERC20(LETH_TOKEN).mint(account, amountOutLessFees);
    }

    function _burnLETH(
        uint amountIn,
        address account
    ) private returns (uint amountOutLessFees) {
        amountOutLessFees = _getEquivalent(false, false, amountIn);
        OwnableERC20(LETH_TOKEN).burn(account, amountIn);
        payable(account).transfer(amountOutLessFees);
    }

    /// @dev _gets the amount to be returned from minting or burning
    /// @param forQUOTE true if the token being minted or burnt is QUOTE
    /// @param mint true if minting and false if burning
    /// @param amountIn amount of ETH or token being deposited or burned
    /// @return amountOutLessFees amount of ETH or token that would be returned after fees
    function _getEquivalent(
        bool forQUOTE,
        bool mint,
        uint amountIn
    ) private view returns (uint amountOutLessFees) {
        uint amountOut;
        if (forQUOTE) {
            amountOut = _updateQUOTE(amountIn, mint);
        } else {
            amountOut = _updateLETH(amountIn, mint);
        }
        amountOutLessFees = amountOut - percentageValue(amountOut, fee);
        return amountOutLessFees;
    }

    /**
     * 
     *
    /// @dev utilises the priceFeed.getPrice() function to fetch price on testnet
    /// priceFeed.getSecurePrice() should be used on mainnet
    /// this is because the getSecurePrice() that checks if optimism sequencer is down is only deployed on mainnet
    /// @param amountIn The amount of QUOTE or ETH being deposited in
    /// @param mint true if QUOTE is being minted and false if it is being burned
    /// @return amountOut The amount of QUOTE or ETH that would be received
     */

    function _updateQUOTE(
        uint amountIn,
        bool mint
    ) private view returns (uint256 amountOut) {
        (int price, uint8 decimal) = _priceFeed.getPrice(dummyTest);

        ///@dev gets  the pool value in USD
        //see PriceMath for computeETHEquivalent() implementation
        uint256 poolValue = price.computeETHEquivalent(
            address(this).balance,
            decimal
        );
        if (mint) {
            amountOut = price.computeUSDEquivalent(amountIn, decimal);
            uint quoteTotalSupply = IERC20(QUOTE_TOKEN).totalSupply();
            if (
                quoteTotalSupply != 0 &&
                underCollateralised(poolValue, quoteTotalSupply)
            ) {
                revert BelowMinCollateralRatio(poolValue / quoteTotalSupply);
            }
        } else {
            amountOut = price.computeETHEquivalent(amountIn, decimal);
        }
    }

    /**   
   * 
   *    /// @dev utilises the priceFeed.getPrice() function to fetch price on testnet
    /// priceFeed.getSecurePrice() should be used on mainnet
    /// this is because the getSecurePrice() that checks if optimism sequencer is down is only deployed on mainnet
     
     ///NOTE :The value of Leth token at each time is equal to the amount of excess collateral 
     i.e the total amount of eth in contract - amount of eth just sufficient to back the total mimted QUOTE token
     
      /// @param amountIn The amount of LETH or ETH being deposited in

    /// @param mint true if LETH is being minted and false if it is being burned
    
    /// @return amountOut The amount of LETH or ETH that would be received
   * 
   * 
   * 
   */

    function _updateLETH(
        uint256 amountIn,
        bool mint
    ) private view returns (uint amountOut) {
        //this case is specifically for initial LETH  minting
        if (address(this).balance == amountIn || address(this).balance == 0) {
            amountOut = amountIn;
            return amountOut;
        }
        (int price, uint8 decimal) = _priceFeed.getPrice(dummyTest);
        require(price != 0, "0 price");
        uint256 poolValue = price.computeETHEquivalent(
            address(this).balance,
            decimal
        );
        uint quoteTotalSupply = IERC20(QUOTE_TOKEN).totalSupply();
        uint lethTotalSupply = IERC20(LETH_TOKEN).totalSupply();
        if (mint) {
            if (
                quoteTotalSupply != 0 &&
                overCollateralised(poolValue, quoteTotalSupply)
            ) {
                revert AboveMaxCollateralRatio(poolValue / quoteTotalSupply);
            }

            amountOut =
                (lethTotalSupply * (amountIn)) /
                _calculateExcessCollateral(
                    quoteTotalSupply,
                    poolValue,
                    price,
                    decimal
                );
        } else {
            //gets the amount Out
            amountOut =
                ((
                    _calculateExcessCollateral(
                        quoteTotalSupply,
                        poolValue,
                        price,
                        decimal
                    )
                ) * amountIn) /
                lethTotalSupply;

            //calculates what would be the value of the pool after subtracting amountOut
            uint poolValueAfter = price.computeUSDEquivalent(
                address(this).balance - amountOut,
                decimal
            );

            //checks if this would result in undercollateralisation and if so revert
            if (
                quoteTotalSupply != 0 &&
                underCollateralised(poolValueAfter, quoteTotalSupply)
            ) {
                revert BelowMinCollateralRatio(
                    poolValueAfter / quoteTotalSupply
                );
            }
        }
    }

    /** 
     * 
     *   /// @dev Calculates the amount of ETH in excess i.e (the total ETH in pool - the amount just sufficient to back all minted QUOTE)
    /// @param quoteTotalSupply the total supply of quote_token
    /// @param poolValue the value of the pool (poolValue = (address(this).balance * price)/(10**decimal)
     /// @param price current price of ETH
    /// @param decimal price decimal

    /// @return ethAmount calculates the excess ETH backing the collateral
    
    */

    function _calculateExcessCollateral(
        uint quoteTotalSupply,
        uint poolValue,
        int price,
        uint8 decimal
    ) private pure returns (uint ethAmount) {
        uint excessCollateralValue = poolValue - quoteTotalSupply;
        return price.computeETHEquivalent(excessCollateralValue, decimal);
    }

    /// @dev Checks if the result of any transaction would result in collateral ratio greater than 8
    /// returns true if so
    function overCollateralised(
        uint nextPoolValue,
        uint quoteTotalSupply
    ) private pure returns (bool) {
        if (nextPoolValue / quoteTotalSupply > MAX_COLLATERAL_RATIO) {
            return true;
        }
        return false;
    }

    /// @dev Checks if the result of any transaction would result in collateral ratio less than 4
    /// returns true if so
    function underCollateralised(
        uint nextPoolValue,
        uint quoteTotalSupply
    ) private pure returns (bool) {
        if (nextPoolValue / quoteTotalSupply < MIN_COLLATERAL_RATIO) {
            return true;
        }
        return false;
    }

    //calculates specified percentage of a number
    function percentageValue(
        uint256 amount,
        uint256 percentage
    ) private pure returns (uint result) {
        return (amount * percentage) / percent_bips;
    }
}
