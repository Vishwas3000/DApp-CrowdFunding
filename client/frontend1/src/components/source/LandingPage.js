import React, { useEffect } from 'react'
import instance from '../web3/Factory'
import web3 from '../web3/Web3';

import './cssFiles/landpage.css'
export default function LandingPage() {


    const ur = "https://miro.medium.com/max/2000/1*qbcbKU_jLBNl__tjrA1U0Q.jpeg";

    useEffect(() => {
  

        let all ; 
        const handle = async () => {
            try {
              
            // all = await instance.methods.getallFundraisers().call();
            // const acc = web3.eth.getAccounts() ; 
           //  console.log("address" , acc ) ; 

            const res =  await instance.methods.getallFundraisers()
             
             console.log("inside",res);
            } catch (err) {
                console.log("err",err);
            }
        }
        handle()
    }, [])

    return (
        <div className="mainland">
            <h1>Are you a doner?</h1>
            <h2>  :start donating to existing fundraiser:)</h2>
            <br></br>
            <h1>else</h1><br></br>
            <h1>:Start your fundraiser for free</h1><br></br>
            <h2> It’ll take only 2 minutes. Just tell us a few details about you and the ones you<br></br>
                are raising funds for.Share your fundraiser</h2>
            <br></br>
            <h2> All you need to do is share the fundraiser with your friends and family.<br></br>
                In no time, support will start pouring in.</h2>
            <br></br>
            <h3>
                Share your fundraiser directly from dashboard on social media.<br></br>Withdraw Funds
                The funds raised can be withdrawn without any hassle directly to your crypto account.<br></br>
                It takes only 5 minutes to withdraw funds on decentify.
                <br></br>
            </h3>
        </div>
    )
}
