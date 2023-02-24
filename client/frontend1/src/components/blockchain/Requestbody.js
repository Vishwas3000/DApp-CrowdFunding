import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import "./css/profile.css"

import Alert from "react-bootstrap/Alert"
import RequestBodyUtils from "./RequestBodyUtils.js"
import {
    getAllRequestsForCampaign,
    createRequestsForCampaign,
} from "../../hooks/campaign.js"

import { MakeRequestUtil } from "../../solidityUtils/Campaign"

export default function FundProfile({ info }) {
    const [req, setReq] = useState({
        rid: null,
        cid: null,
        info: null,
        amount: null,
        duration: null,
    })

    const [requests, setRequests] = useState([
        {
            info: "This is the sample request",
            amount: 12,
            requestId: "sdlfhbv989841@!3e",
            date: "25feb,2019",
            id: "accepted",
        },
        {
            description: "This is the another request",
            amount: 9,
            requestId: "sdlfhbv989841@!3e",
            deadline: "3feb,2019",
            status: "processing",
        },
    ])

    const profile = useSelector((state) => state.fundr.fundr)
    console.log("profile from request , ", profile)

    useEffect(() => {
        getAllRequestsForCampaign(profile.addr)
            .then((res) => {
                if (res.data !== undefined && res.data.length !== 0) {
                    setRequests(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setReq((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async () => {
        const contract_result = await MakeRequestUtil(
            profile.addr,
            req.amount,
            req.duration
        )
        console.log("contract_result to create request ", contract_result)
        if (contract_result.status !== 200) {
            alert("Failed to create Request, ", contract_result.msg)
            return
        }
        const res = await createRequestsForCampaign(
            profile.addr,
            contract_result.msg,
            req.info,
            req.amount
        )

        if (res.status === 200) {
            alert("request added")
            return
        }
        alert("falied to add request!")
    }

    return (
        <div>
            <Alert style={{ width: "25rem" }} key="danger" variant="danger">
                Current Requests :
            </Alert>

            <input
                name="info"
                value={req.info}
                onChange={handleChange}
                type="text"
                placeholder="Enter info"
            />

            <input
                name="amount"
                value={req.amount}
                onChange={handleChange}
                type="number"
                placeholder="Enter amount"
            />

            <p>deadline of the request is of 30 min</p>

            <button onClick={handleSubmit}>Create Request</button>
            <br />
            <br />
            {requests.map((value, key) => {
                return <RequestBodyUtils data={value} />
            })}
        </div>
    )
}
