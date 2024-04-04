// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;
import {PriceFeed} from "./PriceFeed.sol";

contract Minter {
    PriceFeed _priceFeed;

    event MintedLETH(address minter, uint amount);

    event MintedQuote(address minter, uint amount);
}
