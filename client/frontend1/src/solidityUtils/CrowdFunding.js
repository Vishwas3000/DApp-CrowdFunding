import {
    crowdFundingAddresses,
    crowdFundingAbi,
    BlockWaitTime,
} from "../Constants/index.js"
import { ethers } from "ethers"

let contract, connectedContract, signer, provider
var error, retReq

async function ConnectToContract() {
    // provider = auth.provider

    console.log("Calling connect contract")
    window.ethereum.enable()
    provider = new ethers.providers.Web3Provider(window.ethereum)
    // if (!provider) {
    // not provider found
    //return { status: 400, msg: "Provider/'Metamask not recoganizer" }
    // }
    signer = await provider.getSigner()
    const { chainId } = await provider.getNetwork()

    console.log("chain id ", chainId)

    const crowdFindingAddress =
        chainId in crowdFundingAddresses
            ? crowdFundingAddresses[chainId][0]
            : null
    contract = new ethers.Contract(
        crowdFindingAddress,
        crowdFundingAbi,
        provider
    )
    connectedContract = await contract.connect(signer)
}

async function CreateCampaignUtil(campaignGoal, address, minContribution = 0) {
    await ConnectToContract()

    let txReciept, camapignCreatedEvent

    const campaignGoalInWei = await ethers.utils.parseEther(
        campaignGoal.toString()
    )

    try {
        let accounts = await provider.send("eth_requestAccounts", [])

        let account = accounts[0]

        const txResponse = await connectedContract.createCampaign(
            campaignGoalInWei,
            minContribution
        )

        txReciept = await txResponse.wait(BlockWaitTime)

        console.log("transaction reciept: ", txReciept)
    } catch (e) {
        error = e
        console.log(error)
    }

    if (txReciept.status == 1) {
        console.log(camapignCreatedEvent)
        retReq = {
            status: 200,
            address: txReciept.events[0].address,
        }
        console.log(retReq)
    } else {
        retReq = { status: 400, msg: error }
    }

    return retReq
}

async function GetCampaign(owner, campaignId) {
    const campaignAddress = await connectedContract.getCampaign(
        owner,
        campaignId
    )

    const campaignAddressString = campaignAddress.toHexString()

    return { status: 200, campaignAddressString }
}

const GetAllCampaignOfOwner = async (owner) => {
    await connectedContract.getAllCampaignOfOwner(owner)
}

const GetTotalCampaignCreated = async () => {
    var totalCampaign = await connectedContract.getTotalCampaign()
    totalCampaign = totalCampaign.toNumber()
    return totalCampaign
}

export {
    ConnectToContract,
    CreateCampaignUtil,
    GetCampaign,
    GetAllCampaignOfOwner,
    GetTotalCampaignCreated,
}
