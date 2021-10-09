//测试ccmi合约
//mocha chai
const { expect } =require("chai");
const { ethers } = require("hardhat");


//测试前准备
beforeEach(async function(){
    //部署eccm eccd factory合约
    //获取部署者，用户1，用户2
    const [deployer,addr1,addr2] = await ethers.getSigners();
    
    // deploy EthCrossChainData
    const ECCD = await ethers.getContractFactory("EthCrossChainData");
    eccd = await ECCD.deploy();
    await eccd.deployed();
    
    // deploy CallerFactory
    const CallerFactory = await ethers.getContractFactory("CallerFactory");
    factory = await CallerFactory.deploy();
    await factory.deployed();
    
    // update Const.sol
    await updateConst(eccd.address, factory.address);
    await hre.run('compile');
    
    // deploy EthCrossChainManagerImplemetation
    const CCM = await hre.ethers.getContractFactory("EthCrossChainManagerImplemetation");
    ccmi = await CCM.deploy();
    await ccmi.deployed();
      
    // deploy EthCrossChainManager
    const CCMP = await hre.ethers.getContractFactory("EthCrossChainManager");
    ccmp = await CCMP.deploy(ccmi.address,deployer.address,'0x');
    await ccmp.deployed();

    ccm = await CCM.attach(ccmp.address);

    //deploy lockproxy

});

//测试：
describe("crosschain",async function() {
    describe("Test the caller is validate or not", function(){
        it("it should sucess when the caller is child of CallFactory ", async function(){
            //成功，状态改变
            //ccm先看一下ccd 当前数据位置和位置上的值）
            let originIndex = eccd.getEthTxHashIndex();
            expect(eccd.getEthTxHash(originIndex).to.equal(empty));
            //caller调用crossChain方法，返回值直接False
            expect(result= await ccmi.crosschain(toChainId,toContract,method,method,txData).to.equal(true))//参数;
            //检查数据状态。是否和之前保持一致（是不是同一个位置）
            let afterIndex = eccd.getEthTxHashIndex();
            expect(afterIndex.to.equal(originIndex+1))
            //数据写入是否正确 
            expect(eccd.getEthTxHash(afterinIndex).to.equal(rawParam));
            //吐的事件是否是 想要的事件  encode 是否正确
        });
        it("it should fail when the caller is not child of CallFactory ", async function(){
            //不能成功，状态没有改变
            let originIndex = eccd.getEthTxHashIndex();
            expect(eccd.getEthTxHash(originIndex).to.equal(empty));
            //caller调用crossChain方法，返回值直接False
            expect(result= await ccmi.crosschain(toChainId,toContract,method,method,txData).to.equal(false))//参数;
            //检查数据状态。是否和之前保持一致（是不是同一个位置）
            let afterIndex = eccd.getEthTxHashIndex();
            expect(afterIndex.to.equal(originIndex))
            //数据写入是否正确 
            expect(eccd.getEthTxHash(afterinIndex).to.equal(empty));
        });

    });
    describe("Test the right of reading and writing eccd ", function(){
        it("it should fail when not ccmp call", async function(){
            //ccd 的owner 不是现在这个ccm 
            //不能成功，状态没有改变

            //先改变ccd 的owner
            eccd.transferOwner()

            let originIndex = eccd.getEthTxHashIndex();
            expect(eccd.getEthTxHash(originIndex).to.equal(empty));
            //caller调用crossChain方法，返回值直接False
            expect(result= await ccmi.crosschain(toChainId,toContract,method,method,txData).to.equal(false))//参数;
            //检查数据状态。是否和之前保持一致（是不是同一个位置）
            let afterIndex = eccd.getEthTxHashIndex();
            expect(afterIndex.to.equal(originIndex))
            //数据写入是否正确 
            expect(eccd.getEthTxHash(afterinIndex).to.equal(empty));
            //ccd 的owner 再改回来
            eccd.transferOwner()
            //重复一次

        });
        describe( "Test the event",async function(){
            it("it should be right") 
        });
    });
    
});

describe("verifyHeaderAndExecuteTx",async function(){
    describe("Test when everything is ok", function(){
        it("it should success when everything is ok",async function(){

        });
    });
    describe("Test when decode fail", async function(){
        //解码失败，状态回退
        it("it should fail when decodeheader fail");
        
        it("it should fail when decodeCrossTx fail");
        
    });
    describe("Test validator is right or not", async function(){
        it("it should fail when ")
    });

});




