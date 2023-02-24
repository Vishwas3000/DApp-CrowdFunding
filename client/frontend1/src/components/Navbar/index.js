import React , {useEffect} from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';
import './style.css' ;


import { FaAffiliatetheme } from "react-icons/fa";
import { FaAmazonPay } from "react-icons/fa";
import { FaBlogger } from "react-icons/fa";
import { useSelector  } from 'react-redux';
import { Navigate  } from 'react-router';
import { FaFirefoxBrowser } from "react-icons/fa";
// import Button from '@restart/ui/esm/Button';

import Button from 'react-bootstrap/Button';


   
const Navbar = () => {
	const state = {} ; 

	useEffect(() => {
		  state.token = localStorage.getItem("token");
		  state.userid = localStorage.getItem("userid");
		  state.state = true;
	}, []);
	
	state.token = localStorage.getItem("token");
	state.userid = localStorage.getItem("userid");
	state.state = true;


	const handleLogout = () =>{
         localStorage.setItem("token" , "");
		 state.state = false ; 
         localStorage.setItem("userid" , "");   
		 <Navigate 
		 to={{
		   pathname: "/",
		 }}
 	   />
	}

return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink exact to='/' activeStyle>
			<FaAffiliatetheme/>Home
		</NavLink>
		<NavLink to='/about' activeStyle>
			<FaFirefoxBrowser/>Events
		</NavLink>
		<NavLink to='/fundraisers' activeStyle>
			<FaAmazonPay/>Fundraisers
		</NavLink>
		
		<NavLink to='/blogs' activeStyle>
			<FaBlogger/>Blogs
		</NavLink>
		 <NavLink to='/myprofile' activeStyle>
			<FaBlogger/>Profile
	     </NavLink>
			
		</NavMenu>
		
		<NavBtn>
			{
				state.state===true ? <Button variant="dark" onClick = {handleLogout}>Log Out</Button>
				:<NavBtnLink to='/signup'>Sign Up</NavBtnLink>
			}
		
		</NavBtn>
	</Nav>
	</>
);
};

export default Navbar;
