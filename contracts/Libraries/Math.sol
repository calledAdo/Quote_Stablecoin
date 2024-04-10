// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

library Math {
    function mul(uint x, uint y) internal pure returns (uint) {
        return x * y;
    }

    function div(uint x, uint y) internal pure returns (uint) {
        return x / y;
    }

    function pow(uint x, uint y) internal pure returns (uint) {
        return x ** y;
    }
}
