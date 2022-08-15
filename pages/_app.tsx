import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const MyApp = ({ Component, pageProps }: AppProps) => {

  const [isSSR, setisSSR] = useState(true);

  useEffect(() => {
    setisSSR(false)
  }, []);

  if(isSSR) return null;
  return (
  <div>
      <Navbar />
    
  <Component {...pageProps} />
  
  </div>
  )
}

export default MyApp
