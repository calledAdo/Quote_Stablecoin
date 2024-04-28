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

    function percentage(uint self, uint24 perc) internal pure returns (uint) {
        return (self * perc) / (10 ** 6);
    }
}
