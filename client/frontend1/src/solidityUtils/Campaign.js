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
    await console.log("request Id", requestId)

    try {
        await ConnectToContract(campaignAddress)
        const txResponse = await connectedContract.withdraw(requestId)
        txReciept = await txResponse.wait(BlockWaitTime)
        if (txReciept.status == 1) {
            console.log("transaction reciept: ", txReciept)
            const amountWithdrawed = ethers.utils.formatEther(
                txReciept.events[1].args.amountWithdrawed
            )
            console.log(`Withdrawed ether ${amountWithdrawed}`)
            retReq = { status: 200, msg: amountWithdrawed }
        }
    } catch (e) {
        error = e
        console.log(error)
        const timeRemaining = await handleError(error, campaignAddress)
        retReq = { statusbar: 400, msg: `Wait for ${timeRemaining}` }
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
    console.log(
        "contract address & duration ",
        campaignAddress,
        " & ",
        durationOfRequest
    )

    try {
        let txResponse = await connectedContract.makeRequest(
            durationOfRequest,
            ethers.utils.parseEther(withdrawAmount)
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
        console.log(txReciept)
    } catch (e) {
        error = e
        console.log("error is ", e)
        handleError(error)
    }

    if (txReciept.status == 1) {
        retReq = { status: 200 }
    } else {
        retReq = { status: 400, msg: error }
    }
    return retReq
}
async function handleError(error, campaignAddress = null) {
    if (error.message.includes("Stake__ContributerAlreadyVoted()")) {
        alert("Contributer already voted")
    } else if (error.message.includes("Campaign__NotEnoughFundToVote()")) {
        alert("Not Enoung Contribution to Vote / Not a contributer")
    } else if (error.message.includes("Campaign__RequestRejected()")) {
        alert("Request has been rejeted by the Crowd")
    } else if (error.message.includes("Campaign__NotOwner")) {
        alert("You are not the owner of the campaign")
        const owner = await GetOwnerAddress(campaignAddress)
        alert(`The Owner is: ${owner}`)
    } else if (error.message.includes("Stake__DeadlineNotReached")) {
        console.log("the error msg ---------------------")
        const inputStr = error.message
        const jsonObject = JSON.parse(
            inputStr.substring(
                inputStr.indexOf("{"),
                inputStr.lastIndexOf("}") + 1
            )
        )
        const errorMsg = jsonObject.value.data.message
        const errorCode = errorMsg.match(/\(([^)]+)\)/)[1]
        console.log(errorCode)
        return errorCode
    }
}

const GetOwnerAddress = async (campaignAddress) => {
    await ConnectToContract(campaignAddress)

    const requestInfo = await contract.getOwnerAddress()
    console.log(`Contract owner is ${requestInfo}`)
    return requestInfo
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
const GetTotalBalanceInCampaign = async (campaignAddress) => {
    try {
        await ConnectToContract(campaignAddress)

        const amount = await provider.getBalance(contract.address)
        console.log(`Balance: ${ethers.utils.formatEther(amount)}`)
        return { status: 200, msg: ethers.utils.formatEther(amount) }
    } catch (error) {
        console.log(error)
        handleError(error)
        return { status: 400, msg: "failed" }
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
    GetTotalBalanceInCampaign,
}
