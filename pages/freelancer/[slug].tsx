import { GetStaticProps } from 'next'
import React from 'react'
import My_Details_AS_Freelancer from '../../components/My_Details_AS_Freelancer'
import { I_Flancer } from '../../interface'
import { client_Sanity } from '../../sanity'


export const getStaticPaths  = async ()=>{
  const querry_freelancer = `*[_type == "freelancer"]{
    walletAddress
  }`;

  const fetch_this_freelancer = await client_Sanity.fetch(querry_freelancer)
    
  const paths = fetch_this_freelancer.map((item:I_Flancer)=>({
    params:{
      slug:item?.walletAddress
    }
  }))

  return {
    paths,
    fallback:"blocking"
  }
}

export const getStaticProps : GetStaticProps = async({params:{slug}}:any) => {


  const querry_my_data = `*[_type == "freelancer" && walletAddress == '${slug}'][0]`;


  const fetch_freelancer = await client_Sanity.fetch(querry_my_data)

  if(!fetch_freelancer ){
    return{
      notFound:true
    }
  }

  return {
    props:{fetch_freelancer},
    revalidate:60
  }
}



interface Props{
  fetch_freelancer:I_Flancer
}
export default function  Freelancer  ({fetch_freelancer}: Props ) {
  return (
    <div>
      <My_Details_AS_Freelancer data={fetch_freelancer}/>
    </div>
  )
}



