import React from 'react'

// import { withRouter } from 'react-router'
import withRouter from '../../redux/withrouter';

import './css/profile.css'
function Profile() {
    return (
        <div className="mainprofile">
            <div className="profile-card">
                <div className="card-header">
                    <div className="pic">
                        <img src="https://fadzrinmadu.github.io/hosted-assets/amazing-profile-card-using-only-html-and-css/pic.png" alt=""></img>
                    </div>
                    <div className="name">John Doe</div>
                    
                    
                </div>
                <div className="card-footer">
                    <div className="numbers">
                        <div className="item">
                            <span>8</span>
                            Total Fundraisers
                        </div>
                        <div className="border"></div>
                        <div className="item">
                            <span>7</span>
                            Active Fundraisers
                        </div>
                        <div className="border"></div>
                       
                    </div>
                </div>
            </div>
            <div><h1>heloo mffI'm overwhelmed by the outpouring of affection<br></br> 

</h1></div>
        </div>
    )
}
export default withRouter(Profile);