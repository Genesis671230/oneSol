import { ethers } from "ethers";
import { BigNumber } from "ethers";
import React, { useEffect, useState } from "react";
import abi from "../abi/Freelancer.json";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { allJobsQuery } from "../utils/querry";
import toast,{Toaster} from "react-hot-toast"
import Custom_toaster from "./Custom_toaster";
import Link from "next/link";

const runABI = abi.abi;
const contractAddress: string = "0xB06581365d91757B44810594CCBAdC6F275d3c4B";


export default function Hero  (res:any) {

  const { ethereum } = window as any;
  
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, runABI, signer);


  const [accountAddress, setAccountAddress] = useState<string>();
  
  const [listedJobs, setlistedJobs] = useState<any[]>();
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();
  const [deadline, setDealine] = useState<any>();
  const [price, setPrice] = useState<any >();





  


  // const listJobsArr = async () => {
  //   const listedJobs: any = await contract.listJobs();
    
    
  //   if(listedJobs?.length){
  //   const jobArr = listedJobs?.map((item: any) => {
  //     const single_Obj: any = Object.entries(item).map(([key, value]) => {
  //       return { [key]: value };
  //     });
    
     
  //     interface CHECK_PROPERTY {
  //       title?:string | null,
  //       deadline?: string | null,
  //       price?:number | null,
  //       applied?: number | null,
  //       hiredFreelancer?: string | null,
  //       status?: number | null
  //     }


  //     const perfectObj: CHECK_PROPERTY = {
  //       title: null,
  //       deadline: null,
  //       price: null,
  //       applied: null,
  //       hiredFreelancer: null,
  //       status: null,
  //     };

      
  //     single_Obj.map((item: CHECK_PROPERTY ) => {
  //       if ('title' in item) {
  //         perfectObj.title = item.title;
  //       }
  //       if ('deadline' in item) {
  //         perfectObj.deadline = new Date(
  //           BigNumber.from(item.deadline).toNumber() * 1000
  //         ).toLocaleString();
  //       }
  //       if ('price' in item) {
  //         perfectObj.price = BigNumber.from(item.price).toNumber();
  //       }
  //       if ('applied' in item) {
  //         perfectObj.applied = item.applied;
  //       }
  //       if ('hiredFreelancer' in item) {
  //         perfectObj.hiredFreelancer = item.hiredFreelancer;
  //       }
  //       if ('status' in item) {
  //         perfectObj.status = item.status;
  //       }
  //     });

  //     return perfectObj;
  //   });

  //   setlistedJobs(jobArr);
  // }
  // };


  const PostJobFUN :()=>void = async () => {

    const { ethereum } = window as any;
  
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, runABI, signer);

    
    try{


      const val_ether :any=  ethers.utils.parseEther(price);
      const listedJobs : any = await contract.PostJob(title, deadline, price, {
        value: val_ether,
      });
      await listedJobs.wait();

    }catch(err){
      console.log(err);
    }
  };

  const totalJobs = async () => {
    const listedJobs = await contract.totalJobSupply();
    const res = BigNumber.from(listedJobs).toNumber();
  };

  const applyforjob = async (id: number) => {
    const listedJobs = await contract.applyForJob(id, { gasLimit: 120000 });
    await listedJobs.wait();
    console.log(listedJobs);
    window.location.reload();
  };

  const completeJob = async (id: number) => {
    const listedJobs = await contract.applyForJob(id, { gasLimit: 90000 });
    await listedJobs.wait();
    console.log(listedJobs);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const close_With_PostingJob = () => {
    PostJobFUN();
    setTitle((prev) => "");
    setDealine(null);
    setPrice(null);
    setOpen((prev) => !prev);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const checkWallet = async () => {
    const { ethereum } = window as any;
    if (ethereum) {
      toast.loading('Successfully created!');
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      toast.dismiss()
      const response = accounts[0];
      setAccountAddress((prev) => response);
    }
  };

  useEffect(() => {
    checkWallet();  
  }, []);

 
  
  return (
    <div>
      <Custom_toaster/>
      <Dialog open={open} >
        <DialogTitle>Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Post your job make sure to define title, duration and price of
            the project
          </DialogContentText>
          <div className="flex  justify-between gap-10">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Job Title"
              type="text"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Deadline"
              type="number"
              fullWidth
              value={deadline}
              onChange={(e:any) => setDealine(e.target.value)}
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Project Cost"
              type="number"
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              variant="standard"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={close_With_PostingJob}>Post Job</Button>
        </DialogActions>
      </Dialog>

      <div className='bg-[url("../images/img5.jpg")] h-screen bg-cover flex justify-center items-start flex-col'>
        <div className="text-capitalize backdrop-blur-sm h-full  bg-white/50 p-40  rounded-br-full  gap-10  justify-center flex flex-col   ">
          <div className="font-bold text-xl uppercase">
            Welcome to new Era of <br />
            <span className="text-[4vw] text-yellow-400">Freelancing</span> 
          </div>

          <div>
            <div className="font-bold text-xl ">Hire Professional Talent</div>
            <div>Trusted by over 500,000 Clients and 200+ Companies</div>
          </div>

          <div className="flex gap-5">
            <Link href="Hire_freelancer">
            <div>
              <button className="rounded-tl-2xl rounded-br-2xl bg-slate-500 p-3 text-white">
                Hire Freelancer
              </button>
            </div>
            </Link>
            <div onClick={handleClickOpen}>
              <button className="rounded-tl-2xl rounded-br-2xl bg-red-600 p-3 text-white">
                Post a Job
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className=" flex  bg-blue-600 justify-center items-center">
        <div className="m-10 w-full relative gap-y-10 flex flex-wrap  ">
          {listedJobs?.map((item: any, index) => (
            <div key={index}
              className={`m-10 backdrop-blur-sm h-full  rounded-lg p-5  bg-white/50 ${
                item?.status == 1 && "w-full"
              } `}
            >
              <div className="font-bold">
                <span className="mr-5">Job title</span>
                {item?.title}
              </div>
              <div className="">
                <span className="mr-5 text-sm">Deadline</span> {item?.deadline}
              </div>
              <div className="">
                <span className="mr-5 text-sm">Project price</span>{" "}
                <span>${item?.price}</span>
              </div>
              {item?.hiredFreelancer !=
              0x0000000000000000000000000000000000000000 ? (
                <div className="">
                  <span className="mr-5 text-sm">Hired freelancer</span>{" "}
                  <span>{item?.hiredFreelancer}</span>
                </div>
              ) : null}

              {item?.status == null && (
                <div className="">
                  <span className="mr-5 text-sm">
                    Active
                    <div onClick={() => applyforjob(index)}>
                      <button className="rounded-lg bg-red-600 p-3 mt-5 text-white">
                        Apply for Job
                      </button>
                    </div>
                  </span>
                </div>
              )}

              {item?.status == 1 && <span>Pending ...</span>}

              {item?.hiredFreelancer.toUpperCase() ==
                accountAddress?.toUpperCase() && (
                <div onClick={() => completeJob(index)}>
                  <button className="rounded-lg bg-red-600 p-3 mt-5 text-white">
                    Deliever Project
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};


