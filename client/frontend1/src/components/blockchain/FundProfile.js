import React, { useState } from "react"

import { Link, useMatch } from "react-router-dom"
import { Button, ProgressBar } from "react-bootstrap"
// import { FaHandHoldingHeart } from 'react-icons/fa'
import "./css/profile.css"
import Mainbody from "./Mainbody"
import Requestbody from "./Requestbody"
import { useSelector } from "react-redux"

import {
    ContributeUtil,
    GetMinimumContrbutionLimitUtil,
} from "../../solidityUtils/Campaign"

export default function FundProfile({ info }) {
    // const { url } = useMatch ();
    const [win, setWin] = useState("overview")
    const [donAmount, setDonAmount] = useState(null)

    //console.log(info) ;
    const profile = useSelector((state) => state.fundr.fundr)
    const dayLeft = profile.days

    const url = String(window.location.href)

    const handleChangeDonate = (e) => {
        setDonAmount(e.target.value)
    }
    //
    // Need to pass in address and value to donate
    //
    const handleSubmitDonate = async () => {
        console.log("get", donAmount)
        const donate_result = await ContributeUtil(profile.addr, donAmount)

        console.log("donate request result", donate_result)

        if (donate_result.status !== 200) {
            console.log("error msg :", donate_result.msg)
            alert("Failed to donate , error msg :", String(donate_result.msg))
            return
        }
        alert("Amount added to funrasier successfully!! Thank you")
    }
    const getMinContributionLimit = async () => {
        console.log("getting min contribution")

        const result = await GetMinimumContrbutionLimitUtil(profile.addr)

        console.log("min contri result ", result)
    }

    return (
        <div className="mainfor">
            <div id="main" className="main job-page">
                <div className="company-header">
                    <div className="headline-image">
                        <img
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/photo-1429043794791-eb8f26f44081.jpeg"
                            alt="img"
                        ></img>
                    </div>
                    <ul>
                        <li className="nav">
                            <Link to={url}>
                                <Button onClick={(e) => setWin("overview")}>
                                    About the Fundraiser
                                </Button>
                            </Link>
                            <Link to={url}>
                                <Button onClick={(e) => setWin("reqs")}>
                                    requests
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="slide job-detail">
                    <div className="apply-top">
                        <div className="d-grid gap-2">
                            {/* <Button variant="success" size="lg"><FaHandHoldingHeart />Donate Now</Button> */}
                            <ProgressBar
                                animated
                                now={dayLeft}
                                label={`${dayLeft}`}
                            />
                            Days Left!
                        </div>

                        <p>
                            Or, know someone who would be a perfect to donate?
                            Let them know!
                        </p>

                        <a href="local:3000" className="button secondary">
                            <i className="fa fa-facebook"></i>
                            Share on Facebook
                        </a>
                        {/* <Button variant='danger' onClick={handleSubmitContribute}>
                            Contribute
                        </Button> */}
                        <br />
                        <br />
                        <input
                            type="number"
                            value={donAmount}
                            onChange={(e) => {
                                handleChangeDonate(e)
                            }}
                            placeholder="Enter value to donate into this Fundraiser!"
                        ></input>
                        <Button variant="info" onClick={handleSubmitDonate}>
                            Donate
                        </Button>
                    </div>

                    {win === "overview" ? (
                        <Mainbody info={info} />
                    ) : (
                        <Requestbody />
                    )}
                </div>
            </div>
        </div>
    )
}
