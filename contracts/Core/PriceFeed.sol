// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import {AggregatorV2V3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV2V3Interface.sol";

/// @title PriceFeed
/// @notice Fetches ETH price from chainlink proxy  AggregatorV2V3Interface in a secure manner
/// @dev function getPrice is utilised in a testnet environment but getSecurePrice is utilised in
/// mainnet as it ensures security measures  and notifies when L2 sequencer is down

//Backend
contract PriceFeed {
    AggregatorV2V3Interface immutable sequencerUptimeFeed;
    AggregatorV2V3Interface immutable priceFeed;

    error SequencerIsDown(uint timestamp);

    constructor(address pricefeed_) {
        sequencerUptimeFeed = AggregatorV2V3Interface(
            0x371EAD81c9102C9BF4874A9075FFFf170F2Ee389
        );
        priceFeed = AggregatorV2V3Interface(pricefeed_);
    }

    /// @notice gets the current price of ETH and the precision for the latest round from chainlink priceFeed Securely
    /// @dev This is utilised in mainnet as chainlink L2 sequencer uptime feed  is not deployed on testnets
    /// @return answer  price of the latest round
    /// @return decimal price decimal precision
    function getSecurePrice()
        external
        view
        returns (int256 answer, uint8 decimal)
    {
        (, int256 returncode, , , ) = sequencerUptimeFeed.latestRoundData();
        //if returncode == 0 =>sequencer is up
        //if returncode ==1 sequmcer is down
        if (returncode == 1) {
            revert SequencerIsDown(block.timestamp);
        }

        decimal = priceFeed.decimals();
        (, answer, , , ) = priceFeed.latestRoundData();
        require(answer > 0, "Price fetch failure");
        return (answer, decimal);
    }

    /// @notice gets the current price of ETH and the precision for the latest round from chainlink priceFeed
    /// @dev This is utilised  only for testnet as it does not check if sequencer is down
    /// @return answer value gotten from AggregatorV2V3 latest round (last updated price of ETH)
    /// @return decimal precision of price returned
    function getPrice() external view returns (int answer, uint8 decimal) {
        decimal = priceFeed.decimals();
        (, answer, , , ) = priceFeed.latestRoundData();
        return (answer, decimal);
    }
}
