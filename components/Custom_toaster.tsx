import {Toaster} from "react-hot-toast"
const Custom_toaster = () => {
  return (
    <div>      <Toaster
    position="bottom-right"
    reverseOrder={false}
    gutter={8}
    containerClassName=""
    containerStyle={{}}
    toastOptions={{
      // Define default options
      className: '',
      duration: 5000,
      style: {
        background: '#363636',
        color: '#fff',
      },
  
      // Default options for specific types
      success: {
        duration: 3000,
        theme: {
          primary: 'green',
          secondary: 'black',
        },
      },
    }}
  />
      </div>
  )
}

export default Custom_toaster