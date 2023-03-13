import { ethers } from "ethers"
import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import {
    GetContributorsUtil,
    GetTotalFundsRaisedUtil,
    GetTotalBalanceInCampaign,
} from "../../solidityUtils/Campaign"

import "./css/profile.css"

export default function FundProfile({ info }) {
    const profile = useSelector((state) => state.fundr.fundr)
    const [fundRaised, setFundRaised] = useState("")
    const [balanceFund, SetBalanceFund] = useState("")
    const [contributers, setContributers] = useState([])

    const handleGetContributers = async () => {
        const result = await GetContributorsUtil(profile.addr)
        console.log(result.msg)
        if (result.status !== 200) {
            return alert(
                "error to get contributers : " + JSON.stringify(result.msg)
            )
        }

        await setContributers(result.msg)
    }
    console.log("profile", profile)

    const handleGetTotalFunds = async () => {
        const result = await GetTotalFundsRaisedUtil(profile.addr)
        console.log(result)
        await setFundRaised(result.msg)
    }

    const handleBalanceFund = async () => {
        const result = await GetTotalBalanceInCampaign(profile.addr)
        console.log(result)
        SetBalanceFund(result.msg)
    }

    useEffect(() => {
        handleGetTotalFunds()
        handleGetContributers()
        handleBalanceFund()
    }, [])

    useEffect(() => {
        let list = document.getElementById("myList")
        contributers.forEach((item) => {
            let li = document.createElement("li")
            li.innerText = item
            list.appendChild(li)
        })
    }, [contributers])

    return (
        <div>
            <h1>{profile.title}</h1>
            <div className="job-body">
                <p>Contract Address : {profile.addr}</p>

                <ul>
                    <li>Dear friends,</li>
                    <br />
                    <br />
                    <b>{profile.tagline}</b>
                </ul>
                <h2>Important Notes</h2>
                <p>
                    We look to positively impact the lives we touch by making a
                    difference each day. Change drives our business each and
                    every day and our culture allows us to manage and embrace
                    change by establishing core values:
                </p>
                <div className="details">
                    <p className="job-payrange">
                        <strong>Amount Needed :</strong>
                        {profile.amount} INR
                    </p>
                    <p className="date">
                        <strong>Posted</strong>:{" "}
                        <span itemprop="datePosted">
                            {profile.time},{profile.date}
                        </span>
                    </p>
                    <p className="job-status">
                        <strong>Fundraiser Category</strong>:{" "}
                        <span itemprop="employmentType">{profile.tag}</span>
                    </p>

                    <p>
                        <strong>Fund Rised</strong> : {fundRaised} ETH
                    </p>
                    <p>
                        <strong>Balance</strong> : {balanceFund} ETH
                    </p>
                </div>
                <div>
                    <h2>Recent Contributers</h2>
                    <ul id="myList"></ul>
                </div>
            </div>
        </div>
    )
}
