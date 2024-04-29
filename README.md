# Quote Protocol

Quote is a decentralized stable coin that utilizes the the Fractional Reserve and Virtual Perpetual Futures (V.P.F) mechanism to ensure stability and Capital efficiency .

Quote Protocol works on two main architectures -->

- **Public Provider**
- **Private Providers**

### Public Provider

The public provider utilizes the Virtual Perpetual Futures (V.P.F) mechanism whereby for any QUOTE minted two virtual perpetual positions (Long and Short) are created thereby making a delta neutral stability mechanism <br>
The **V.P.F** system is made possible through a two token system (QUOTE and LETH) <br>
The **QUOTE** takes the place of a short position on ETH and maintains a stable value of 1 QUOTE to $1,while **LETH** takes the place of a long Position in ETH and the value is dependent on the amount of excess collateral in the pool . <br><br>
The Public Provider ensures to maintain a minimal longs to shorts ratio of 4 ( to ensure sufficient collateral for each QUOTE minted) and a maximum of 8( to avoid over saturation of rewards for LETH holders).<br><br>

### Private Providers

Private Providers provide a Capital Efficient gateway for individuals to open Collateralized Debt Positions (C.D.P) by providing the excess collateral needed for minting QUOTE .<br><br>
**Private Providers** set their interest rates for utilizing their liquidity and when individuals open debt positions with them the excess collateral supplied by the Private Providers can not be withdrawn by the provider but can be supplied on secondary protocol (currently Aave) to earn yields while also eligible to receive interest on the debt position thereby creating the necessary incentives for persons to act as private providers and creating a competitive market and giving users flexibility in choosing options <br>

```shell
npx hardhat ignition deploy ./ignition/modules/ProviderDetails.ts --network scrollSepolia

npx hardhat verify --network scrollSepolia 0x785fd27fed0b2AA387B4c014d3ec1Cce6b67c7AE

npx hardhat ignition deploy ./ignition/modules/UserDetails.ts --network scrollSepolia

npx hardhat verify --network scrollSepolia 0x318184E7fE747646c13C4D879E7bC04152aC03bB

npx hardhat ignition deploy ./ignition/modules/Factory.ts --network scrollSepolia
npx hardhat ignition deploy ./ignition/modules/PublicProvider.ts --network scrollSepolia

npx hardhat verify --network scrollSepolia --constructor-args arguments.js 0xe91AD4a4ec8112D9323cDAFf5c6F97B1e13502F7

npx hardhat run scripts/PrivateProvider.ts --network scrollSepolia
```
