# Quote Protocol

Quote is a decentralized  stable coin that utilizes both the Fractional Reserve model and Virtual Perpetual Futures (V.P.F)  mechanism to ensure price stability and Capital efficiency .

Quote  Protocol works on two main architectures
-  **Public Provider**
- **Private Providers**

### Public Provider
 The public provider utilizes  the Virtual Perpetual Futures (V.P.F) mechanism whereby for any QUOTE minted two virtual perpetual positions (Long and Short) are created thereby making a delta neutral stability mechanism <br>
  The **V.P.F** system is made possible through  a two token system (QUOTE and LETH) <br>
 The **QUOTE** takes the place of a short position on ETH and maintains a stable value of 1 QUOTE to $1,while **LETH** takes the place of a long Position in ETH and the value is dependent on the amount of excess collateral in the pool .  <br><br>
 Persons are incentivized to mint LETH by receiving the fees paid by QUOTE minters while also earning extra yields from fees paid by individuals who utilise the  Pooled  Liquidity in flash loans <br>
The Public Provider ensures to maintain a minimal  longs to shorts ratio of 4 ( to ensure sufficient collateral for each QUOTE minted) and  a maximum of 8( to avoid over saturation of rewards for LETH holders).<br><br>


### Private Providers
  Private Providers provide a Capital Efficient  gateway for individuals to open Collateralized Debt Positions (C.D.P) by providing the excess collateral needed for minting QUOTE ,hence individuals are able to utilise up to 90% of their collateral in CDP's <br><br>
**Private Providers** set their interest rates for utilizing their liquidity  and when individuals open debt positions with them the excess collateral supplied by the Private Providers can not be withdrawn by the provider but can be supplied on secondary protocol (currently Aave) to earn yields while also eligible to receive interest on the debt position thereby creating the necessary incentives for persons to act as private providers and creating a competitive market and giving users flexibility in choosing options<br>
Being a Private Provider can be very lucrative as they enjoy the following benefits 
- Interest rate  paid by individuals who opened CDP's
- fees Paid by persons who utilise the liquidity for flash loans
- 75% of the entire liquidity(ETH) within the Position can be deposited on Aave hence also generating extra yield for Private Providers(Note:The  Aave aTokens minted out is also locked in the pool)

 This would also bring in independent Financial Entities into the ecosystem and the formation of DAO's as Private  Providers<br>  

## Project SetUp


**Core**<br>
  Containes all the core logic of the protocol including the Providers  (Both Public and Private) abd also the Factory contract for creating new Private Providers,it also contains the priceFeed  contract for fetching accurate Price <br>
 **Fetchers**<br>
  This contains the fetcher contracts utilised for basically fetching required details from the contract for use in the frontend<br>
 **Interface**<br>
  This contains all external interfaces implemented by the core logic like the Aave V3 WrappedTokenGateway
 **Libraries**<br>
Calculation libraries utilised in the core contract 


## Deployed Addresses
### Core Contracts 

[Global State](https://sepolia.scrollscan.com/address/0x031fe35d4798d92b2a6f6b4fa1ff22b0c6cc4f4a#code)<br>
The GlobalState contract serves as the governing body of the protocol where important paramters of the Providers (public and Private) are stored and set ,it is currently controlled by us but that authority can easily be given to a DAO in the future. <br>

[PriceFeed](https://sepolia.scrollscan.com/address/0xfd3548c0b15c3b12eaf689c520d0381e7ef0c501#code)<br>
PriceFeed contract basically fetches ETH/USD rate securely from Chainlink Oracles and is utilised for minting QUOTE,we implemented the **AggregatorV2V3Interface**  interface that provides a secure method for checking if L2 sequencer is down but that is to be used only on mainnet. <br>

[Factory](https://sepolia.scrollscan.com/address/0xc7078EF8707c029988fA1b863f400667DC8e0D45#code)<br>
The Factory contract for creating new Private providers. <br>
Private Providers are created and allocated a special ID that can be mapped to them.<br>

[Public Provider](https://sepolia.scrollscan.com/address/0xe91ad4a4ec8112d9323cdaff5c6f97b1e13502f7#code)<br>
The Public Provider contract that utilizes the V.P.F mechanism and   serves as the entry point for minting and burning QUOTE and LETH.

### Fetchers

[UserDetailsFetcher](https://sepolia.scrollscan.com/address/0x318184E7fE747646c13C4D879E7bC04152aC03bB#code)<br>
This contains the getUtilisedProviders method that returns the addresses of all private providers that user has a debt position.<br>

[ProviderDetailsFetcher](https://sepolia.scrollscan.com/address/0x785fd27fed0b2AA387B4c014d3ec1Cce6b67c7AE#code)<br>
This contains the getFunctionalAddresses method that takes in a user address and  returns an array of all providers that are functional and that user has no debt position on.(NOTE:users can only have one debt position per provider).
