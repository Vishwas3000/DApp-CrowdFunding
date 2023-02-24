import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import { TbArrowBarLeft } from "react-icons/tb"

import Alert from "react-bootstrap/Alert"
import { isValidDate, compareDate } from "../../helper/utils.js"
// import {CreateCampaign as CreateCampaignHlp} from '../Campign.js';
// import {getConnection} from '../solidityUtils/index.js' ;

import { CreateCampaignUtil } from "../../solidityUtils/CrowdFunding.js"
import { createCampaign } from "../../hooks/campaign.js"

function CreateCampaign() {
    const history = useNavigate()

    const handlegoBack = () => {
        history("/fundraisers")
    }

    const [campaign, setCampaign] = useState({
        email: null,
        title: null,
        desc: null,
        addr: null,
        amount: null,
        date: null,
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setCampaign((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()

        console.log("test....")

        if (Object.values(campaign).includes(null)) {
            window.alert("Please enter all the values!")
            return
        } else {
            console.log("No value is null")
        }

        if (
            !isValidDate(campaign.date) ||
            compareDate(campaign.date) === false
        ) {
            window.alert("Enter the valid date for deadline")
            return
        }
        console.log("test....")
        console.log("campaign", campaign)

        const contract_result = await CreateCampaignUtil(
            campaign.amount ? campaign.amount : 0,
            campaign.addr
                ? campaign.addr
                : "0x918fd2c5991feac1553dd783161eca6e15b1abcd"
        )

        console.log("---------------result------------", contract_result)
        if (contract_result.status === 400) {
            alert("Failed to create Campaign!", contract_result.msg)
            return
        }

        let obj = campaign
        obj["addr"] = contract_result.address
        const bc_res = await createCampaign(obj)
        // if(bc_res)
        console.log("bc_res , ", bc_res)
        if (bc_res.status === 200) {
            alert("Campaign Craeted!!")
            history("/fundraisers")
            return
        } else {
            alert("Failed to create campaign!")
        }
    }

    return (
        <>
            <button
                onClick={handlegoBack}
                style={{
                    border: "none",
                    backgroundColor: "white",
                    textAlign: "right",
                    padding: "20px",
                }}
            >
                <TbArrowBarLeft />
            </button>

            <Form style={{ maxWidth: "30rem", marginLeft: "10rem" }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        name="email"
                        value={campaign.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="Enter email"
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        name="title"
                        value={campaign.title}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter title"
                    />

                    <Form.Label>Description (YYYY-MM-DD)</Form.Label>
                    <Form.Control
                        name="desc"
                        value={campaign.desc}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter title"
                    />

                    <Form.Label>Deadline</Form.Label>
                    <Form.Control
                        name="date"
                        value={campaign.deadline}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter title"
                    />

                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        name="email"
                        value={campaign.email}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter Description"
                    />
                    <Form.Label>Amount(in ether)</Form.Label>
                    <Form.Control
                        name="amount"
                        value={campaign.amount}
                        onChange={handleChange}
                        type="number"
                        placeholder="Enter Amount"
                    />
                    <Form.Label>Your Arcana Wallet address</Form.Label>
                    <Form.Control
                        name="addr"
                        value={campaign.addr}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter your Your Arcana Wallet address"
                    />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default CreateCampaign
