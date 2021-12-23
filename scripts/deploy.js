const { ethers } = require("hardhat");
const hre = require("hardhat");
var fs = require("fs");
const Web3 = require("web3");
const colors = require('colors');
hre.web3 = new Web3(hre.network.provider);

async function main() {

  [deployer] = await hre.ethers.getSigners();

  // check if given networkId is registered
  var ChainID;
  var ChainName;
  await getPolyChainId().then((polyIdandName) => {
    console.log("\nDeploy EthCrossChainManager on chain with Poly_Chain_Id:".cyan, polyIdandName);
    ChainID= polyIdandName[0]
    ChainName=polyIdandName[1]
 
  }).catch((error) => {
    throw error;
  });;
  netProvider=hre.config.networks[ChainName].url
  console.log(netProvider)

  console.log("Start , deployer:".cyan, deployer.address.blue);

  await hre.run('compile');
  
  // deploy EthCrossChainData
  console.log("\ndeploy EthCrossChainData ......".cyan);
  const ECCD = await hre.ethers.getContractFactory("EthCrossChainData");
  const eccd = await ECCD.deploy();
  await eccd.deployed();
  console.log("EthCrossChainData deployed to:".green, eccd.address.blue);
  
  // deploy CallerFactory
  console.log("\ndeploy CallerFactory ......".cyan);
  const CallerFactory = await hre.ethers.getContractFactory("CallerFactory");
  const cf = await CallerFactory.deploy();
  await cf.deployed();
  console.log("CallerFactory deployed to:".green, cf.address.blue);
  
  // update Const.sol
  console.log("\nupdate Const.sol ......".cyan);
  await updateConst(eccd.address, cf.address);
  console.log("Const.sol updated".green);
  await hre.run('compile');
  
  // deploy EthCrossChainManagerImplemetation
  console.log("\ndeploy EthCrossChainManagerImplemetation ......".cyan);
  const CCM = await hre.ethers.getContractFactory("EthCrossChainManagerImplemetation");
  const ccm = await CCM.deploy();
  await ccm.deployed();
  console.log("EthCrossChainManagerImplemetation deployed to:".green, ccm.address.blue);
  
  // deploy EthCrossChainManager
  console.log("\ndeploy EthCrossChainManager ......".cyan);
  const CCMP = await hre.ethers.getContractFactory("EthCrossChainManager");
  const ccmp = await CCMP.deploy(ccm.address,deployer.address,'0x');
  await ccmp.deployed();
  console.log("EthCrossChainManager deployed to:".green, ccmp.address.blue);

  // transfer ownership
  console.log("\ntransfer eccd's ownership to ccm ......".cyan);
  await eccd.transferOwnership(ccmp.address);
  console.log("ownership transferred".green);

  console.log("\nDone.\n".magenta);
  
  let provider=fs.readFileSync("./hardhat.config.js",(err,provider)=>{
    if (err) {
      throw err;
    }else{
      console.log("provider".magenta,provider.toString());
    }  
  });
  console.log("provider".magenta,provider.toString());

  // config 
  var config = {
    Name:ChainName,
    ChainID : ChainID,
    Provider: NetProvider,
    EthCrossChainData : eccd.address,
    EthCrossChainManagerImplemetation : ccm.address,
    EthCrossChainManager : ccmp.address,
  };
   //read previous config
   let data=fs.readFileSync("./config1.json",(err,data)=>{
      if (err) {
        throw err;
      }else{
        previous=data.toString();
      }  
   });
  //add new config
  //var buffer=JSON.stringify(data)
  var json=JSON.parse(data.toString())
  json.Network[json.Network.length]=config
  var jsonConfig =JSON.stringify(json,null,"\t")
  var outputPath = './config1.json';
  console.log("\njson output\n",jsonConfig);
  try {
    fs.writeFileSync(outputPath, jsonConfig);
  } catch (err) {
    console.error(err);
  }
};

async function updateConst(eccd, callerFactory) {
  const polyChainIdandName = await getPolyChainId();

  fs.writeFileSync('./contracts/core/cross_chain_manager/logic/Const.sol', 
  'pragma solidity ^0.5.0;\n'+
  'contract Const {\n'+
  '    bytes constant ZionCrossChainManagerAddress = hex"5747C05FF236F8d18BB21Bc02ecc389deF853cae"; \n'+
  //'    bytes constant ZionValidaterManagerAddress = hex"A4Bf827047a08510722B2d62e668a72FCCFa232C"; \n'+
  '    address constant EthCrossChainDataAddress = '+eccd+'; \n'+
  '    address constant EthCrossChainCallerFactoryAddress = '+callerFactory+'; \n'+
  '    uint constant chainId = '+polyChainIdandName[0]+'; \n}')
}

async function getPolyChainId() {
  const chainId = await hre.web3.eth.getChainId();
  switch (chainId) {
    
    // mainnet
    case 1: // eth-main
      return [2,"eth_main"];
    case 56: // bsc-main
      return [6,"bsc_main"];
    case 128: // heco-main
      return [7,"heco_main"];
    case 137: // polygon-main
      return [17,"polygon_main"];
    case 66: // ok-main
      return [12,"ok_main"];
    case 1718: // plt-main
      return [8,"plt_main"];

    // testnet
    case 3: // eth-test
      return [2,"eth_test"];
    case 97: // bsc-test
      return [79,"bsc_test"];
    case 256: // heco-test
      return [7,"heco_test"];
    case 80001: // polygon-test
      return [202,"polygon_test"];
    case 65: // ok-test
      return [200,"ok_test"];
    case 101: // plt-test
      return [107,"plt_test"];
    //poly2.0
    case 5851://ontology-test
      return [103,"ontology_test"]
    // hardhat devnet
    case 31337:
      return [77777,"hardhat devnet"];

    // unknown chainid
    default: 
      throw new Error("fail to get Poly_Chain_Id, unknown Network_Id: "+chainId);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

