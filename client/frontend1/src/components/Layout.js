import React , {useEffect} from 'react';

import { Routes , Route  } from 'react-router-dom'
import { URL } from '../helper/helper';
import FundraiseList from './blockchain/FundraiseList';
import LandingPage from './source/LandingPage';
import Notfound from './source/Notfound';
import axios from 'axios';
import FundProfile from './blockchain/FundProfile';
import CreateCampaign from './campaign/CreateCampaign';
import Navbar from './Navbar';
import Privateroute from './auth/Privateroute';
import Profile from './auth/Profile';
import Signup from './auth/Signup';
import { useSelector , useDispatch } from 'react-redux';
import { setAuth } from '../redux/actions/action';
import Homepage from './homepage/Homepage';

const Layout = () => {

    
    const auth  = useSelector((state) => state.auth)
   
    const dispatch = useDispatch()    
    useEffect(() => {
        axios.get(`${URL}/validatoken/${auth.token}`)
        .then( (result) =>{
            console.log(result);
            if(result.data.error!=""){
                auth.state = false;
                dispatch(setAuth(auth));
               return;
            }
             
            auth.state = true;
            dispatch(setAuth(auth));
            
        } )
        .catch((err) => {
            auth.state = false;
            dispatch(setAuth(auth));
        })
        console.log("check" , auth)  ;
    }, [])

    return (
        <>
        <Navbar/> 
            <Routes  >
                <Route  path='/'  exact element={<Homepage/> }  />
                <Route  path='/fundraisers' exact element={<FundraiseList/>}/>
                <Route  path='/fundraisers/create' exact element={<CreateCampaign/>}/>
                <Route  path='/fundraisers/:id' exact element={<FundProfile/>}/>
                <Route  path='/list' exact element={<FundraiseList/>}/>
                <Route  path='/signup' exact element={<Signup/>}/>
                <Route  path='/myprofile'  element={<Profile/>} isAuth = {auth.state} />
                <Route path="*" element={<Notfound/>}/>
            </Routes> 
           
        </>
    );

}

export default Layout;