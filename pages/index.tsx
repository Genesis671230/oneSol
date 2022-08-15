import type { NextPage } from 'next'
import { client_Sanity } from '../sanity'
import MainPage from './MainPage'

const Home: NextPage = (data:any) => {
  return (
    <div>
      <MainPage/>
    </div>
  )
}

export default Home


export const getServerSideProps = async() =>{
  const query:string = `*[_type == "clients"]`;

 const data = await  client_Sanity.fetch(query)
  
console.log("this is cheking for response from sanity",data)
  return {
    props:{data}
  }
}