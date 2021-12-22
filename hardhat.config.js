/**
 * @type import('hardhat/config').HardhatUserConfig
 */
//npx hardhat run scripts/deploy.js --network <network-name>
require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: "0.5.17",
  networks:{
    ontology_testnet:{
      url:"http://polaris3.ont.io:20339",
      accounts:[""]
    },
  }
};



