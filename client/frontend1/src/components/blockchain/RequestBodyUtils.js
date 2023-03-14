import React, { useEffect, useState } from "react"

import Alert from "react-bootstrap/Alert"

import { Button } from "react-bootstrap"
// import { createRequestsForCampaign } from "../../hooks/campaign.js"
import {
    StakeInRequestUtil,
    WithdrawUtil,
    GetRequestInfoUtil,
} from "../../solidityUtils/Campaign"
import { useSelector } from "react-redux"

export default function RequestBodyUtils({ data }) {
    const profile = useSelector((state) => state.fundr.fundr)

    const handleSubmitRequestAccept = async () => {
        console.log(data.rid)
        const res = await StakeInRequestUtil(profile.addr, data.rid, 1) //Also pass in campaign address
        if (res.status === 200) {
            alert("Your response recorder!")
            return
        } else {
            alert("Failed to record your response ,  msg : ", res.msg)
        }
    }

    const handleSubmitRequestDeny = async () => {
        const res = await StakeInRequestUtil(profile.addr, data.rid, 0) //Also pass in campaign address

        if (res.status === 200) {
            alert("Your response recorder!")
            return
        } else {
            alert("Failed to record your response ,  msg : ", res.msg)
        }
    }

    const handleSubmitWithdraw = async () => {
        const res = await WithdrawUtil(profile.addr, data.rid) //Also pass in campaign address
        console.log("result of withdraw: ", res)

        if (res.status === 200) {
            alert(`Bingoo,Money transfered to your account! (amt :${res.msg})`)
            return
        } else {
            alert(`Failed to withdraw your money ,  msg : ${res.msg}`)
        }
    }

    return (
        <div>
            <Alert style={{ width: "35rem" }} key="info" variant="info">
                Id : {data["id"]}{" "}
                <Button variant="danger" onClick={handleSubmitWithdraw}>
                    Withdraw Money{" "}
                    <p style={{ fontSize: "10px" }}>
                        Only contract creater can do!
                    </p>
                </Button>
                <>
                    <br />
                </>
                Info : {data["info"]}
                <>
                    <br />
                    <br />
                </>
                amount requested : {data["amount"]} (in eths)
                <>
                    <br />
                </>
                Deadline : {data["date"]}
                <>
                    <br />
                </>
                <>
                    Current Status:
                    <br />
                </>
                <>
                    <br />
                </>
                <>
                    <Button
                        variant="success"
                        onClick={handleSubmitRequestAccept}
                    >
                        Approve
                    </Button>{" "}
                    {"    "}{" "}
                    <Button variant="danger" onClick={handleSubmitRequestDeny}>
                        Deny
                    </Button>
                </>
            </Alert>
        </div>
    )
}
