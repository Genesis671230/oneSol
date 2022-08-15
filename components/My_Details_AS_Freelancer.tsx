import React from 'react'
import { urlFor } from '../sanity'

const My_Details_AS_Freelancer = ({data}:any)=> {
  return (
    <div>
        
      <div className='bg-[url("https://source.unsplash.com/random/?freelancer")] h-screen bg-cover flex justify-end items-start flex-col'>
        <div className="text-capitalize backdrop-blur-sm h-full  bg-white/50 p-40    gap-2  justify-center flex flex-col   ">
          <div className="font-bold text-3xl uppercase ">
            <img src={urlFor(data.image)} alt="" className='w-80 object-cover rounded-lg'/>
          </div>

          <div>
            <div className="font-bold text-xl ">{data.name}</div>
            <div>Wallet Address <span className='font-bold'> {data.walletAddress}</span></div>
          </div>

          <div className="flex gap-5">
            <div >
              <button className="rounded-tl-2xl rounded-br-2xl bg-slate-500 p-3 text-white">
                Hire Me
              </button>
            </div>
            <div >
              <button className="rounded-tl-2xl rounded-br-2xl bg-red-600 p-3 text-white">
                Email me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default My_Details_AS_Freelancer