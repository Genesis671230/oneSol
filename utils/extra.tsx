export const changeChain = async () => { 
    const { ethereum } = window as any
    try{

      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x4' }],
      });
    }catch(err:any){
      if (err.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x4',
                chainName: 'Rinkeby Test Network',
                rpcUrls: ['https://rinkeby.infura.io/v3/'] /* ... */,
              },
            ],
          });
        } catch (addError) {
          console.log(addError)
        }
      }
    }
 }