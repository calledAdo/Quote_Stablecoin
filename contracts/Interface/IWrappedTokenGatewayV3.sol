// SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;

interface IWrappedTokenGatewayV3 {
    function depositETH(
        address pool,
        address onBehalfOf,
        uint16 referralCode
    ) external payable;

    function withdrawETH(
        address pool,
        uint256 amount,
        address onBehalfOf
    ) external;

    function repayETH(
        address pool,
        uint256 amount,
        uint256 rateMode,
        address onBehalfOf
    ) external payable;

    function borrowETH(
        address pool,
        uint256 amount,
        uint256 interestRateMode,
        uint16 referralCode
    ) external;

    //Arbitrum :0x20040a64612555042335926d72B4E5F667a67fA1
    function withdrawETHWithPermit(
        address pool,
        uint256 amount,
        address to,
        uint256 deadline,
        uint8 permitV,
        bytes32 permitR,
        bytes32 permitS
    ) external;
}
