import axios from 'axios';
import React from 'react'
import './css/login.css'
import { URL } from '../../helper/helper';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../redux/actions/action';
import { Navigate   , useLocation , useNavigate } from 'react-router';

export default function Signup(props) {

    const location  = useLocation();
    const history  = useNavigate () ; 
    const res = {
        token : "",
        userid : "",
        state : true,
    }

    const dispatch = useDispatch() ;


    const handleLogin = () =>{
         const username  = document.getElementById("user").value;
         const password  = document.getElementById("pass").value;

         const auth = {
             username : username,
             password : password,
         }
        
         axios.post(`${URL}/login` , auth)
         .then( (result) =>{
             if(result.data.error!==""){
                alert(result.data.error) ;
                return;
             }
             res.token = result.data.token;
             res.userid = result.data.id;
             localStorage.setItem("token" , res.token );
             localStorage.setItem("userid",res.userid);
             dispatch(setAuth(res));
             
             history.push("/myprofile");
            
         } )
         .catch((err) => {
            alert(err) 
            return; 
         })
        

    }
    const handleSignup = () =>{
        const name  = document.getElementById("name").value;
        const password  = document.getElementById("passn").value;
        const username  = document.getElementById("usern").value;
        const pass2  = document.getElementById("passnn").value;

        if ( password !== pass2 ){
            alert("you have entered two different passwords");
            return;
        }
        const auth = {
            username : username,
            name:name,
            password : password,
        }
        
        
       
        axios.post(`${URL}/register` , auth)
        .then( (result) =>{
          
            alert("user registered succesfully now get logged in",result);
            return
        } )
        .catch((err) => {
           alert(err) 
           return; 
        })
    }
    
    
   
    

    return (
        <div classNameName="loginmain">
            <div className="login-wrap">
                <div className="login-html">
                    <input id="tab-1" type="radio" name="tab" className="sign-in" checked/><label for="tab-1" className ="tab">Sign In</label>
                    <input id="tab-2" type ="radio" name="tab" className ="sign-up"/><label for="tab-2" className ="tab">Sign Up</label>
                    <div className ="login-form">
                    <div className ="sign-in-htm">
                    <div className ="group">
                    <label for="user" className ="label">Username</label>
                    <input id="user" type ="text" className ="input"/>
                    </div>
                    <div className ="group">
                    <label for="pass" className ="label">Password</label>
                    <input id="pass" type ="password" className ="input" data-type ="password"/>
                    </div>
                    <div className ="group">
                    <input id="check" type ="checkbox" className ="check" checked/>
                    <label for="check"><span className ="icon"></span> Keep me Signed in</label>
                    </div>
                    <div className ="group">
                    <button className="butcss" onClick={handleLogin}><input type ="submit" className ="button" value="Sign In"/></button>    
                    
                    </div>
                    <div className ="hr"></div>
                    <div className ="foot-lnk">
                    <a href="#forgot">Forgot Password?</a>
                    </div>
                    </div>
                    <div className ="sign-up-htm">
                    <div className ="group">
                    <label for="user" className ="label">Name</label>
                    <input id="name" type ="text" className ="input"/>
                    </div>
                    <div className ="group">
                    <label for="pass" className ="label">Username</label>
                    <input id="usern" type ="text" className ="input"/>
                    </div>  
                    <div className ="group">
                    <label for="pass" className ="label">Password</label>
                    <input id="passn" type ="password" className ="input" data-type ="password"/>
                    </div>
                    <div className ="group">
                    <label for="pass" className ="label">Repeat Password</label>
                    <input id="passnn" type ="password" className ="input" data-type ="password"/>
                    </div>
                    
                    <div className ="group">
                    <button className="butcss" onClick={handleSignup}><input type ="submit" className ="button" value="Sign Up"/></button>
                    
                    </div>
                    <div className ="hr"></div>
                    <div className ="foot-lnk">
                    <label for="tab-1">Already Member?</label>
                    </div>
                    </div>
                    </div>
                 </div>
             </div>
            </div>
            )
}
