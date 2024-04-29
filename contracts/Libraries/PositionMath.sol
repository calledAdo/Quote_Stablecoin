//SPDX-License-Identifier:MIT

pragma solidity ^0.8.19;

import {Math} from "./Math.sol";
import {PriceMath} from "./PriceMath.sol";

library PositionMath {
    using Math for *;
    using PriceMath for *;

    struct DebtPosition {
        //The amount of collateralSize in debt Position
        uint collateralSize;
        //amount of unUtilisedCollateral;
        uint unUtilisedCollateral;
        //The total Quote Minted by this position
        uint quoteMinted;
        //The set Interest rate
        uint24 interestRate;
        //The minimum over percentage collateralization before liquidation
        int24 minDrawdown;
        //The minimum duration of the position
        //eg :for 1 week = block.timestamp + 1 weeks
        uint positionDuration;
        //The  last updated time (changed everytime  interactions with the position is made)
        uint lastUpdatedTimestamp;
    }

    /**
     * @notice Calculates the approximate liquidation price for that particular
     * @dev This basically reverses the process of getting the percentage over collateralization
     *  ( see percentageOverCollateralization below) to get the price
     * i.e  at what price is the percentageOverCollateralization = targetDrawdown
     *
     * @param self The position of reference
     *
     *
     * @param globalMaxDrawdown the global Max drawdown
     */

    function calcLiquidationPrice(
        DebtPosition memory self,
        int24 globalMaxDrawdown
    ) internal view returns (uint price) {
        uint amountAfterInterest = self.collateralSize - calcInterest(self);
        //target draw down is determined by taking the highest value between the set drawdown and the current global max drwdown
        int24 targetDrawdown = self.minDrawdown > globalMaxDrawdown
            ? self.minDrawdown
            : globalMaxDrawdown;

        uint minCollateralValue = uint(
            ((targetDrawdown * int(self.quoteMinted)) / (10 ** 6)) +
                int(self.quoteMinted)
        );

        //calculates the price
        price = (minCollateralValue * (10 ** 20)) / amountAfterInterest;
        return price;
    }

    /**
     *@dev Calculates the percentage overcollateralization of the position 
       utilised for checking the health of a position
     * @param self the reference position
     *
     *
     * @param price The current price
     * @param decimal price  precision
     */
    function percentageOverCollateralization(
        DebtPosition memory self,
        int price,
        uint8 decimal
    ) internal view returns (int24) {
        uint collateralAfterFees = self.collateralSize - calcInterest(self);
        uint collateralValue = collateralAfterFees.computeQUOTE(price, decimal);
        int differrence = int(collateralValue) - int(self.quoteMinted);
        return int24((differrence * (10 ** 6)) / int(self.quoteMinted));
    }

    /**
     *
     * @param self the position of reference
     *
     *
     * @return  interest current interest on that position
     *
     * Note:Interest is calculated by multiplying total number of seconds since last update
     * and the interest per second
     *  where interest per second is interest rate / (1 yr in seconds i.e 31536000)    */

    function calcInterest(
        DebtPosition memory self
    ) internal view returns (uint interest) {
        uint timeSpan = block.timestamp - self.lastUpdatedTimestamp;
        uint amountPerYear = self.collateralSize.percentage(self.interestRate);

        interest = (amountPerYear * timeSpan) / 31536000;
    }
}
