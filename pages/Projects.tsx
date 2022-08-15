import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from "../abi/Freelancer.json";



const runABI = abi.abi;
const contractAddress: string = "0xB06581365d91757B44810594CCBAdC6F275d3c4B";


const Projects = () => {
    const { ethereum } = window as any;
  
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, runABI, signer);

  const [listedJobs, setlistedJobs] = useState<any[]|null>();
  const [accountAddress, setAccountAddress] = useState<string>();

  
  const listJobsArr = async () => {

    try{

    const listedJobs: any = await contract.listJobs();


    if(listedJobs){
      const jobArr = listedJobs?.map((item: any) => {
        const single_Obj: any = Object.entries(item).map(([key, value]) => {
          return { [key]: value };
        });
      
       
        interface CHECK_PROPERTY {
          title?:string | null,
          deadline?: string | null,
          price?:number | null,
          applied?: number | null,
          hiredFreelancer?: string | null,
          status?: number | null
        }
  
  
        const perfectObj: CHECK_PROPERTY = {
          title: null,
          deadline: null,
          price: null,
          applied: null,
          hiredFreelancer: null,
          status: null,
        };
  
        
        single_Obj.map((item: CHECK_PROPERTY ) => {
          if ('title' in item) {
            perfectObj.title = item.title;
          }
          if ('deadline' in item) {
            perfectObj.deadline = new Date(
              BigNumber.from(item.deadline).toNumber() * 1000
            ).toLocaleString();
          }
          if ('price' in item) {
            perfectObj.price = BigNumber.from(item.price).toNumber();
          }
          if ('applied' in item) {
            perfectObj.applied = item.applied;
          }
          if ('hiredFreelancer' in item) {
            perfectObj.hiredFreelancer = item.hiredFreelancer;
          }
          if ('status' in item) {
            perfectObj.status = item.status;
          }
        });
  
        return perfectObj;
      });
  
      setlistedJobs(jobArr);
    }

    }catch(err:any){
      console.log(err?.message);
    }
    
  
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

  useEffect(() => {
    listJobsArr();
  }, []);
  const checkWallet = async () => {
    const { ethereum } = window as any;
    if (ethereum) {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const response = accounts[0];
      setAccountAddress((prev) => response);
    }
  };

  useEffect(() => {
    checkWallet();  
  }, []);



  return (
    <div>
        <div className=" flex  bg-blue-600 p-10 justify-center items-center min-h-screen">
        <div className="m-10 w-full relative gap-y-10 flex flex-wrap  ">
          {listedJobs?.map((item: any, index:number) => (
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
      </div>
    </div>
  )
}

export default Projects