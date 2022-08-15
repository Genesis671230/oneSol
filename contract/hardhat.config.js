require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks:{
    hardhat:{},
    rinkeby:{
      url: "https://eth-rinkeby.alchemyapi.io/v2/TMdp3xEu-ll1dbH_aPP_Tc21vDPvm5P0",
      accounts: ['beeacc94cc3217ad36fbad988d016fc4800c2c53d382aafd10d1447307334db0']
    }
  }
};
