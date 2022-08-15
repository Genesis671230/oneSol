import { NextPage } from "next";
import Freelancer_Details from "../components/Freelancer_Details";
import { I_Flancer } from "../interface";
import { client_Sanity } from "../sanity";

interface Prop{
  data:[I_Flancer]
}
const Hire_freelancer = (data:Prop) => {
    const lancers = data.data
console.log(lancers)
  return (
    <div>
          <div className='bg-[url("https://source.unsplash.com/random/?freelancer")] h-screen bg-cover flex justify-center items-center'>
        {
            lancers.map((item:any)=>(
                <div key={item._id}>
                <Freelancer_Details data={item}/>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default Hire_freelancer


export const getServerSideProps = async() =>{
    const query:string = `*[_type == "freelancer"]`;
  
   const data = await  client_Sanity.fetch(query)
    
  console.log("this is cheking for response from sanity",data)
    return {
      props:{data}
    }
  }