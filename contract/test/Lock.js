const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers");
const { expect } = require("chai");
const { increaseTo } = require("@nomicfoundation/hardhat-network-helpers/dist/src/helpers/time");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

describe("Freelancer", function () {

  async function freelancerFixture() {
   
    const [owner, otherAccount,sec_account,third_account] = await ethers.getSigners();

    const Freelancer = await ethers.getContractFactory("Freelancer");
    const freelancer = await Freelancer.deploy();


    return { freelancer, owner, otherAccount,sec_account,third_account };
  }

  describe("Deployment", function () {
    it("Should return zero if no job has been posted yet", async function () {
      const { freelancer, owner } = await loadFixture(freelancerFixture);
      expect(await freelancer.totalJobSupply()).to.equal(0);
    });
    
    it("Should return zero if no job has been posted yet", async function () {
      const { freelancer, owner,otherAccount } = await loadFixture(freelancerFixture);
      const ethAmount = "1";
      const transaction = {
        value: ethers.utils.parseEther('1'),
      };


      const postAJob = await freelancer.connect(otherAccount).PostJob("Reactjs",1,ethAmount,transaction);
      expect(await freelancer.totalJobSupply()).to.equal(1);
      const getlj = await freelancer.listJobs();
      expect(getlj.length).to.equal(1);



    });


   



    it("Should return ok ", async function () {
      const { freelancer, owner, otherAccount,sec_account,third_account} = await loadFixture(freelancerFixture);

      const post_job = await freelancer.connect(sec_account).PostJob("Reactjs",100000000000,"1",{value:ethers.utils.parseEther("1")})
      const post_job_2 = await freelancer.connect(third_account).PostJob("solidity engineer",1000000000,"1",{value:ethers.utils.parseEther("1")})


      await freelancer.connect(otherAccount).whitelistF()
      await freelancer.connect(owner).whitelistF()
      
      expect(await freelancer.connect(otherAccount).checkWhitelistedF()).to.be.not.null
      expect(await freelancer.connect(otherAccount).checkWhitelistedF()).to.be.not.undefined
      expect(await freelancer.connect(otherAccount).checkWhitelistedF()).to.be.not.NaN
      expect(await freelancer.connect(otherAccount).checkWhitelistedF()).to.equal(true)
      

      await freelancer.connect(otherAccount).applyForJob(1)
      await freelancer.connect(owner).applyForJob(2)
      const status_JOB = await freelancer.connect(otherAccount).listJobs()  

      await freelancer.connect(otherAccount).completeJob(1)
      await freelancer.connect(owner).completeJob(2)





      console.log(await (freelancer.jobById(1)));

      const res1 = await (freelancer.jobById(1)).status;
      const res2 = await (freelancer.jobById(2)).status;

        expect( res1).to.be.not.null
        expect( res2).to.be.not.null

      const jobArr = status_JOB.map((item)=>{
        const single_Obj = Object.entries(item).map(([key,value])=>{
          return {[key]:value}
      })

      const perfectObj = {title:"",deadline:null,
      price:null,applied:null,hiredFreelancer:"",status:null}
      single_Obj.map((item)=>{
        if(item.title){
          perfectObj.title = item.title;
        }
        if(item.deadline){
          perfectObj.deadline = (new Date(BigNumber.from(item.deadline).toNumber()*1000)).toLocaleString();
        }
        if(item.price){

          perfectObj.price = BigNumber.from(item.price).toNumber();
        }
        if(item.applied){

          perfectObj.applied = item.applied;
        }
        if(item.hiredFreelancer){
          perfectObj.hiredFreelancer = item.hiredFreelancer
        }
        if(item.status){
          perfectObj.status = item.status
        }
      })
      
      
      return perfectObj;
      })

      
      const ACC_1 = [otherAccount,owner]
      let add = 0
      jobArr.map((item,index)=>{
        console.log(item);
          expect((item.hiredFreelancer).toUpperCase()).to.equal((ACC_1[add].address).toUpperCase())
          add++
        })

    
     
    });



it("should check is address is whitelisted as freelancer", async  function(){
  const {owner,freelancer,otherAccount,sec_account,third_account} = await loadFixture(freelancerFixture);
  
  expect(await freelancer.connect(otherAccount).checkWhitelistedF()).to.equal(false)
  await freelancer.connect(otherAccount).whitelistF()


  expect(await freelancer.connect(otherAccount).checkWhitelistedF()).to.equal(true)
})















    

    // it("Should receive and store the funds to lock", async function () {
    //   const { lock, lockedAmount } = await loadFixture(
    //     deployOneYearLockFixture
    //   );

    //   expect(await ethers.provider.getBalance(lock.address)).to.equal(
    //     lockedAmount
    //   );
    // });

    // it("Should fail if the unlockTime is not in the future", async function () {
    //   // We don't use the fixture here because we want a different deployment
    //   const latestTime = await time.latest();
    //   const Lock = await ethers.getContractFactory("Lock");
    //   await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
    //     "Unlock time should be in the future"
    //   );
    // });


  });



  // describe("Withdrawals", function () {
  //   describe("Validations", function () {
  //     it("Should revert with the right error if called too soon", async function () {
  //       const { lock } = await loadFixture(deployOneYearLockFixture);

  //       await expect(lock.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });

  //     it("Should revert with the right error if called from another account", async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { lock, unlockTime } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
  //   });

  //   describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { lock, unlockTime, lockedAmount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw())
  //         .to.emit(lock, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });

  //   describe("Transfers", function () {
  //     it("Should transfer the funds to the owner", async function () {
  //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).to.changeEtherBalances(
  //         [owner, lock],
  //         [lockedAmount, -lockedAmount]
  //       );
  //     });
  //   });

    
  // });


});
