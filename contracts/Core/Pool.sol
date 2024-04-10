//SPDX-License-Identifier:MIT

pragma solidity ^0.8.19;

import {PriceFeed} from "./PriceFeed.sol";
import {PROVIDER} from "./Provider.sol";
import {PriceMath} from "../Libraries/PriceMath.sol";

contract Provider is PROVIDER {
    using PriceMath for uint;
    uint CURRENT_MAX_DRAW_DOWN;
    uint CURRENT_INTEREST_RATE;
    uint CURRENT_FEE;
    uint totalQuoteBacked;

    address public immutable s_owner;
    uint24 constant percent_Bips = 100000;
    uint constant seconds_per_year = 31536000;
    mapping(address => DebtPosition) userToDebtPosition;

    struct DebtPosition {
        uint timestamp;
        uint amountIn;
        uint quoteMinted;
        uint maxPositionDrawDown;
        uint interestRate;
    }

    modifier onlyowner() {
        require(msg.sender == s_owner);
        _;
    }

    constructor(
        address _owner,
        address _priceFeed,
        bool _dummy,
        address quote
    ) PROVIDER(_priceFeed, _dummy, quote) {
        s_owner = _owner;
    }

    function percentagePNL(address user) external view returns (int) {
        (int price, uint8 decimal) = _priceFeed.getPrice(dummyTest);
        DebtPosition memory userDebtPosition = userToDebtPosition[user];
        uint equivalent_without_fee = userDebtPosition.amountIn.computeQUOTE(
            price,
            decimal
        );

        uint equivalent = equivalent_without_fee -
            calcInterest(
                equivalent_without_fee,
                userDebtPosition.interestRate,
                userDebtPosition.timestamp
            );
        return diffPercent(equivalent, userDebtPosition.quoteMinted);
    }

    //mapping number to debt position

    function deposit() external payable {}

    function diffPercent(uint x, uint y) private pure returns (int) {
        int difference = int(x) - int(y);
        int num = difference * 100 * int(uint(percent_Bips));
        return num / int(x);
    }

    function calcInterest(
        uint amount,
        uint fee,
        uint time
    ) private view returns (uint) {
        uint timespansec = block.timestamp - time;
        uint fee_per_year = (fee * amount) / percent_Bips;
        return (fee_per_year * timespansec) / seconds_per_year;
    }
}
