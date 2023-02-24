import React from 'react'
import { setFundr } from '../../redux/actions/action';
import {Card  , Button} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {FcCurrencyExchange,FcFile }  from "react-icons/fc";
import { FaUserCircle  } from "react-icons/fa";

import {BiChevronRight}  from "react-icons/bi";

import { Link  , useLocation   } from 'react-router-dom';

export default function FundCard({info}) {
    
    // const {url} = useMatch () ; 
    const location = useLocation() ; 
    const url = String(window.location.href) ;

    const dispatch = useDispatch() ; 

    const handleFunc =   () => {
         dispatch(setFundr(info));
    }

    console.log(location , window.location.href);

    return (
      
        <Card style={{ width: '18rem' ,maxWidth : '18rem' , padding:'1rem' }}>
            <Card.Img variant="top" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/photo-1429043794791-eb8f26f44081.jpeg" />
            <Card.Body>
                <Card.Title><FcFile/>{info.title}</Card.Title>
                <Card.Text>
                    <FaUserCircle/> By: {info.name}<br></br>
                     <BiChevronRight/> Date: {info.time}, {info.date}<br></br>
                      { info.tagline!==undefined && info.tagline.length > 21?  info.tagline.slice(0 ,  20 ) : info.tagline}......
                </Card.Text>
                <Link to={`${url}/${info.title}`} > 
                <Button variant="warning"  onClick={handleFunc} >Read more and Donate <FcCurrencyExchange/></Button>
                 </Link>
                
            </Card.Body>
        </Card>
    ) 
}
