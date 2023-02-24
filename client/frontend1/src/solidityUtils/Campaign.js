import { campaignAbi, BlockWaitTime } from "../Constants/index.js"
import { ethers } from "ethers"

let contract, connectedContract, signer, provider

var error, retReq

async function ConnectToContract(campaignAddress) {
    await window.ethereum.enable()
    provider = new ethers.providers.Web3Provider(window.ethereum)
    if (!provider) {
        //return { status: 400, msg: "Provider/MetaMask was not recoganized" }
    }
    signer = await provider.getSigner()

    contract = new ethers.Contract(campaignAddress, campaignAbi, provider)
    connectedContract = await contract.connect(signer)

    console.log(signer)
}

const ContributeUtil = async (campaignAddress, ethValueFromContributer) => {
    try {
        console.log("campaign reacieved ----------------", campaignAddress)
        await ConnectToContract(campaignAddress)

        const tx = {
            to: campaignAddress,
            value: ethers.utils.parseEther(
                ethValueFromContributer.toString(),
                "ether"
            ),
        }

        const txResponse = await signer.sendTransaction(tx)

        let txReciept

        txReciept = await txResponse.wait(BlockWaitTime)
        console.log("transection Recipt -------------", txReciept)
        if (txReciept.status == 1) {
            retReq = {
                status: 200,
            }
        } else {
            retReq = { status: 400, msg: "status failed" }
        }
        return retReq
    } catch (e) {
        // error = e
        console.log(e)
        return { status: 400, msg: String(e) }
    }
}

const WithdrawUtil = async (campaignAddress, requestId) => {
    let txReciept

    try {
        await ConnectToContract(campaignAddress)
        const txResponse = await connectedContract.withdraw(requestId)
        txReciept = await txResponse.wait(BlockWaitTime)
    } catch (e) {
        error = e
        console.log(error)
    }

    if (txReciept.status == 1) {
        retReq = { status: 200 }
    } else {
        retReq = { statusbar: 400, msg: error }
    }

    return retReq
}

const MakeRequestUtil = async (
    campaignAddress,
    withdrawAmount,
    durationOfRequestInHours
) => {
    await ConnectToContract(campaignAddress)

    console.log("time received ", durationOfRequestInHours)

    let durationOfRequest = await Math.ceil(durationOfRequestInHours * 60),
        txReciept
    durationOfRequest = 1800
    console.log(
        "contract address & duration ",
        campaignAddress,
        " & ",
        durationOfRequest
    )

    try {
        let txResponse = await connectedContract.makeRequest(
            durationOfRequest,
            withdrawAmount
        )

        txReciept = await txResponse.wait(BlockWaitTime)
        console.log("----------------")
        console.log(txResponse)
        console.log("----------------")
        console.log(txReciept)
    } catch (e) {
        error = e
        console.log(error)
    }

    if (txReciept.status == 1) {
        console.log("passing Request applied")
        retReq = { status: 200, msg: txReciept.events[0].args[0].toNumber() }
    } else {
        console.log("Request declinded", error)
        retReq = { status: 400, msg: error }
    }

    return retReq
}

const StakeInRequestUtil = async (campaignAddress, requestId, voteValue) => {
    let txResponse, txReciept

    try {
        console.log("calling to stake")
        console.log(campaignAddress)
        console.log("request id -------", requestId)
        await ConnectToContract(campaignAddress, voteValue)
        if (voteValue === 1) {
            // Accpeterd vote
            txResponse = await connectedContract.stakeInRequest(requestId, 1)
        } else {
            txResponse = await connectedContract.stakeInRequest(requestId, 0)
        }

        txReciept = await txResponse.wait(BlockWaitTime)
        console.log("----------------")
        console.log(txResponse)
        console.log("----------------")
        console.log(txReciept)
    } catch (e) {
        error = e
        console.log("error is ", JSON.stringify(e))
    }

    if (txReciept.status == 1) {
        retReq = { status: 200 }
    } else {
        retReq = { status: 400, msg: error }
    }
    return retReq
}

const GetRequestInfoUtil = async (campaignAddress, requestId) => {
    ConnectToContract(campaignAddress)

    const requestInfo = await contract.getRequestInfo(requestId)

    console.log(`Request Info ${requestInfo}, Data type is ${typeof requestId}`)
    return { requestInfo }
}

const GetRequestStatusUtil = async (campaignAddress, requestId) => {
    ConnectToContract(campaignAddress)

    const requestStatus = await contract.getRequestStatus()

    console.log(`request status ${requestStatus}`)
    return requestStatus._hex
}

const GetMinimumContrbutionLimitUtil = async (campaignAddress) => {
    console.log("address----------", campaignAddress)

    // provider.getCode(campaignAddress)
    try {
        await ConnectToContract(campaignAddress)

        const minContributionLimit = await contract.getMinContributionLimit()
        console.log("minimum contribution ", minContributionLimit)

        return { status: 200, msg: minContributionLimit.toNumber() }
    } catch (e) {
        console.log(e)
        return { status: 400, msg: error }
    }
}

const GetContributorsUtil = async (campaignAddress) => {
    await console.log("Getting contributers-----------", campaignAddress)

    try {
        await ConnectToContract(campaignAddress)

        const contributers = await contract.getContributors()

        console.log("contributers ----- ", contributers)
        return { status: 200, msg: contributers }
    } catch (e) {
        error = e
        console.log(error)
        return { status: 400, msg: error }
    }
}

const GetTotalFundsRaisedUtil = async (campaignAddress) => {
    console.log("Getting total fund raised-------------", campaignAddress)

    try {
        await ConnectToContract(campaignAddress)

        const amount = await contract.getTotalFund()
        const amountInEth = await ethers.utils.formatEther(amount)

        console.log(amount, amountInEth)

        return { status: 200, msg: amountInEth }
    } catch (e) {
        error = e
        console.log(error)
        return { status: 400, msg: error }
    }
}

export {
    ContributeUtil,
    WithdrawUtil,
    MakeRequestUtil,
    StakeInRequestUtil,
    GetRequestInfoUtil,
    GetRequestStatusUtil,
    GetMinimumContrbutionLimitUtil,
    GetContributorsUtil,
    GetTotalFundsRaisedUtil,
}
