import React from 'react'
import {Route , Navigate  } from 'react-router-dom' ; 

export default function Privateroute( { isAuth : isAuth , component : Component , ...rest } ) {
    return (
        <Route {...rest} render = {
            (props) =>{
                if(isAuth){
                    return <Component />;
                }else{
                    return <Navigate 
                    to={{pathname : "/signup", state:{ from : props.location } }}
                    />
                }
            }
        } ></Route>
    )
}
