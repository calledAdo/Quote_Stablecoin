// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OwnableERC20 is ERC20 {
    address immutable _owner;

    modifier onlyOwner() {
        require(msg.sender == _owner);
        _;
    }

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _owner = msg.sender;
    }

    function mint(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) external onlyOwner {
        _burn(account, amount);
    }
}
