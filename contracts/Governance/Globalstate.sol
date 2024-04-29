// SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract GlobalState is Ownable {
    //////////////
    //PRIVATE PROVIDER:
    /**
     * PRIVATE_MIN_MUL is the percentage of the Deposited Eth that must be in the pool as excess collateral when minting QUOTE
     * MAX_COLLATERAL_UTILIZATION is the maximum percentage of the deposited ETH that can be utilised to mint QUOTE
     * MAX_DRAWDOWN is the minimum percentage dropdown of the position value that would warranty a global liquidation
     *
     * */
    /////////// ////
    //100 * 10 **4 is 100%
    uint24 public PRIVATE_MIN_MUL = 50 * (10 ** 4); //50%
    uint24 public MAX_COLLATERAL_UTILISATION = 90 * (10 ** 4); //90%
    int24 public MIN_DRAWDOWN = -5 * (10 ** 4); //-10%
    uint24 public LIQUIDATION_FEE = 3 * (10 ** 4); //5%

    //1 * 10**6 is 100%
    //////////////
    //PUBLIC PROVIDER:
    /////////// ////
    uint24 public PUBLIC_MIN_MUL = 300 * (10 ** 4); //300%
    uint24 public PUBLIC_MAX_MUL = 600 * (10 ** 4); //600%
    uint24 public PUBLIC_FEE = 1 * (10 ** 4); //1%

    constructor() Ownable(msg.sender) {}

    function privateProviderDetails()
        external
        view
        returns (
            uint24 multiplier,
            uint24 maxUtilisation,
            int24 minDrawDown,
            uint24 liquidationFee
        )
    {
        return (
            PRIVATE_MIN_MUL,
            MAX_COLLATERAL_UTILISATION,
            MIN_DRAWDOWN,
            LIQUIDATION_FEE
        );
    }

    function publicProviderDetails()
        external
        view
        returns (uint24 minMultiplier, uint24 maxMutiplier, uint24 fee)
    {
        return (PUBLIC_MIN_MUL, PRIVATE_MIN_MUL, PUBLIC_FEE);
    }

    ///////////
    //Private Providers

    function setPrivateMinMul(uint24 newValue) external onlyOwner {
        PRIVATE_MIN_MUL = newValue;
    }

    function setMaxCollateralUtilisation(uint24 newValue) external onlyOwner {
        MAX_COLLATERAL_UTILISATION = newValue;
    }

    function setMinDrawDown(int24 newValue) external onlyOwner {
        MIN_DRAWDOWN = newValue;
    }

    function setLiquidationFee(uint24 newValue) external onlyOwner {
        LIQUIDATION_FEE = newValue;
    }

    ////////

    ///////////
    //Public Provider
    function setPublicMinMul(uint24 newValue) external onlyOwner {
        PUBLIC_MIN_MUL = newValue;
    }

    function setPublicMaxMul(uint24 newValue) external onlyOwner {
        PUBLIC_MAX_MUL = newValue;
    }

    function setPublicfee(uint24 newValue) external onlyOwner {
        PUBLIC_FEE = newValue;
    }
    ////////
}
