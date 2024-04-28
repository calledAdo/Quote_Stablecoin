// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {ERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OwnableERC20 is ERC20 {
    mapping(address => bool) isAllowed;
    address immutable _admin;
    uint8 immutable decimal;

    modifier onlyAllowed() {
        require(isAllowed[msg.sender] || msg.sender == _admin);
        _;
    }

    constructor(
        string memory name,
        string memory symbol,
        uint8 decimal_
    ) ERC20(name, symbol) {
        _admin = msg.sender;
        decimal = decimal_;
    }

    function setAllowed(address pool) external {
        require(msg.sender == _admin);
        isAllowed[pool] = true;
    }

    function mint(address account, uint256 amount) external onlyAllowed {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) external onlyAllowed {
        _burn(account, amount);
    }

    function decimals() public view override returns (uint8) {
        return decimal;
    }
}
