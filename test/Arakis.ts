import { Exter } from './../typechain-types/contracts/Exter';
import { expect } from 'chai';
import { Signer } from 'ethers';
import { ethers } from "hardhat";
import { Exter, Exter__factory } from "../typechain-types";
import { expandTo18Decimals } from './utilities';




describe("Exter", function () {

  let Exter : Exter ;
  let owner :  any ; 
  let Signer : any ; 
  let seedRound : any ; 
  let publicRound : any ; 
  let marketing : any ; 
  let reserve : any ;
  let teamNfounders : any ; 
  let advisors : any ; 
  let rewardsPool : any ;
  let liquidity : any ; 
  let KOL : any ; 
  let privateRound : any ; 
  let ecosystemGrowth : any ; 
  let airdrop : any ;

  beforeEach(async () =>{
    Signer = await ethers.getSigners();
    (owner = Signer[0]),
    (seedRound = Signer[1]),
    (publicRound = Signer[2]),

    (marketing = Signer[3]),
    (reserve = Signer[4]),
    (teamNfounders = Signer[5]),
    (advisors = Signer[6]),
    (rewardsPool = Signer[7]),
    (liquidity = Signer[8]),
    (KOL = Signer[9]),
    (privateRound = Signer[10]),
    (airdrop = Signer[11]),
    (ecosystemGrowth = Signer[12]);

    Exter = await new Exter__factory(owner).deploy();

  })





it("it should assign correct name and symbol to the token" , async () =>{

    expect(await Exter.connect(owner).name()).to.be.equal("Exter");
    expect(await Exter.connect(owner).symbol()).to.be.equal("AURICS");

})
it("The tokens should be minted correctly to the owner" , async () =>{

    expect(await Exter.connect(owner).balanceOf(owner.address)).to.be.equal(expandTo18Decimals(10000000000));
    expect(await Exter.connect(owner.address).totalSupply()).to.be.equal(expandTo18Decimals(10000000000));

})

 it("Only owner should be able to call the Airdrop Function" , async() =>{

    let airdropAdd = [seedRound.address, publicRound.address , marketing.address , reserve.address, teamNfounders.address , advisors.address,
        rewardsPool.address, liquidity.address , KOL.address, privateRound.address, ecosystemGrowth.address , airdrop.address]
         
        let amounts = [expandTo18Decimals(500000000),
             expandTo18Decimals(600000000),
            expandTo18Decimals(800000000),
            expandTo18Decimals(1500000000),
            expandTo18Decimals(1500000000),
            expandTo18Decimals(300000000),
            expandTo18Decimals(3000000000),
            expandTo18Decimals(400000000),
            expandTo18Decimals(100000000),
            expandTo18Decimals(200000000),
            expandTo18Decimals(1000000000),
            expandTo18Decimals(100000000)]
    
            await expect(Exter.connect(airdrop).AirdropTokens(airdropAdd,amounts)).to.be.revertedWith("Ownable: caller is not the owner");


 })


  it("it should airdrop to multiple addresses"  , async () =>{

    let airdropAdd = [seedRound.address, publicRound.address , marketing.address , reserve.address, teamNfounders.address , advisors.address,
    rewardsPool.address, liquidity.address , KOL.address, privateRound.address, ecosystemGrowth.address , airdrop.address]
     
    let amounts = [expandTo18Decimals(500000000),
         expandTo18Decimals(600000000),
        expandTo18Decimals(800000000),
        expandTo18Decimals(1500000000),
        expandTo18Decimals(1500000000),
        expandTo18Decimals(300000000),
        expandTo18Decimals(3000000000),
        expandTo18Decimals(400000000),
        expandTo18Decimals(100000000),
        expandTo18Decimals(200000000),
        expandTo18Decimals(1000000000),
        expandTo18Decimals(100000000)]

        await Exter.connect(owner).AirdropTokens(airdropAdd,amounts);
        expect( await Exter.connect(owner).balanceOf(owner.address)).to.be.equal(0);

        expect (await Exter.connect(seedRound.address).balanceOf(seedRound.address)).to.be.equal(expandTo18Decimals(500000000));
        expect (await Exter.connect(publicRound.address).balanceOf(publicRound.address)).to.be.equal(expandTo18Decimals(600000000));
        expect (await Exter.connect(marketing.address).balanceOf(marketing.address)).to.be.equal(expandTo18Decimals(800000000));
        expect (await Exter.connect(reserve.address).balanceOf(reserve.address)).to.be.equal(expandTo18Decimals(1500000000));
        expect (await Exter.connect(teamNfounders.address).balanceOf(teamNfounders.address)).to.be.equal(expandTo18Decimals(1500000000));
        expect (await Exter.connect(advisors.address).balanceOf(advisors.address)).to.be.equal(expandTo18Decimals(300000000));
        expect (await Exter.connect(rewardsPool.address).balanceOf(rewardsPool.address)).to.be.equal(expandTo18Decimals(3000000000));
        expect (await Exter.connect(liquidity.address).balanceOf(liquidity.address)).to.be.equal(expandTo18Decimals(400000000));
        expect (await Exter.connect(KOL.address).balanceOf(KOL.address)).to.be.equal(expandTo18Decimals(100000000));
        expect (await Exter.connect(privateRound.address).balanceOf(privateRound.address)).to.be.equal(expandTo18Decimals(200000000));
        expect (await Exter.connect(ecosystemGrowth.address).balanceOf(ecosystemGrowth.address)).to.be.equal(expandTo18Decimals(1000000000));
        expect (await Exter.connect(airdrop.address).balanceOf(airdrop.address)).to.be.equal(expandTo18Decimals(100000000));


        
})


it(" Array length of Addresses and Amounts should not mismatch" , async () =>{

    let airdropAdd = [seedRound.address, publicRound.address , marketing.address , reserve.address, teamNfounders.address , advisors.address,
        rewardsPool.address, liquidity.address , KOL.address, privateRound.address, ecosystemGrowth.address , airdrop.address]
         
        let amounts = [expandTo18Decimals(500000000),
             expandTo18Decimals(600000000),
            expandTo18Decimals(800000000),
            expandTo18Decimals(1500000000),
            expandTo18Decimals(1500000000),
            expandTo18Decimals(300000000),
            expandTo18Decimals(3000000000),
            expandTo18Decimals(400000000),
            expandTo18Decimals(100000000),
            expandTo18Decimals(200000000),
            expandTo18Decimals(1000000000)]
    
            await expect( Exter.connect(owner).AirdropTokens(airdropAdd,amounts)).to.be.revertedWith("Size of input parameters doesn't match");

})

it("it should not send aidrop if There is a Zero Address" , async () =>{



    let airdropAdd = [seedRound.address, publicRound.address , marketing.address , reserve.address, teamNfounders.address , advisors.address,
        rewardsPool.address, liquidity.address , KOL.address, privateRound.address, ecosystemGrowth.address , ethers.constants.AddressZero]
         
        let amounts = [expandTo18Decimals(500000000),
             expandTo18Decimals(600000000),
            expandTo18Decimals(800000000),
            expandTo18Decimals(1500000000),
            expandTo18Decimals(1500000000),
            expandTo18Decimals(300000000),
            expandTo18Decimals(3000000000),
            expandTo18Decimals(400000000),
            expandTo18Decimals(100000000),
            expandTo18Decimals(200000000),
            expandTo18Decimals(1000000000),
            expandTo18Decimals(100000000)]


            await expect( Exter.connect(owner).AirdropTokens(airdropAdd,amounts)).to.be.revertedWith("Error :  Address Zero");

})

   

  


});