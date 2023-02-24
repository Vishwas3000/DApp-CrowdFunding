import React from 'react'

import './cssFiles/notfound.css'

export default function Notfound() {
    return (
        <div className="mainforerror">
            <div className="noiseerr"></div>
            <div className="overlayerr"></div>
            <div className="terminalerr">
                <h1>Error <span className="errorcodeerr">404</span></h1>
                <p className="outputerr">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
                <p className="outputerr">Please try to <a href="http://localhost:3000"><b style={{color:"red"}}>go back</b></a> or <a href="http://localhost:3000"><b style={{color:"red"}}>
                return to the homepage</b></a>.</p>
                <p className="outputerr">Good luck.</p>
            </div>

        </div>
    )
}
