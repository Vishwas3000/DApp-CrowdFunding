import React from 'react'
import { ThreeDots } from  'react-loader-spinner'

export default function Loader() {
  return (
    <div  style={{marginLeft:'45%' , marginTop:'15%'}} >
        <ThreeDots 
        height="100" 
        width="100" 
        radius="9"
        color="black" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  )
}
