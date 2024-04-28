# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

```shell

npx hardhat ignition deploy ./ignition/modules/Factory.ts --network scrollSepolia

 npx hardhat ignition deploy ./ignition/modules/Factory.ts --network scrollSepolia


npx hardhat verify --network scrollSepolia --constructor-args arguments.js 0xc7078EF8707c029988fA1b863f400667DC8e0D45

npx hardhat ignition deploy ./ignition/modules/PublicProvider.ts --network scrollSepolia

npx hardhat verify --network scrollSepolia --constructor-args arguments.js 0xe91AD4a4ec8112D9323cDAFf5c6F97B1e13502F7
```

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

y
