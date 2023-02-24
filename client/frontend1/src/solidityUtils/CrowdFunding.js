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
    // chainId = 31337 // Mantle chain ID

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

// async function CreateCampaignUtil(campaignGoal, address, minContribution = 0) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await ConnectToContract()

//             let txReciept, camapignCreatedEvent

//             let accounts = await provider.send("eth_requestAccounts", [])

//             let account = accounts[0]

//             console.log("Running----------")
//             contract.on(
//                 "CampaignCreated",
//                 (ownerAddress, campaignIndex, campaignAddress) => {
//                     camapignCreatedEvent = {
//                         owner: ownerAddress,
//                         campaignId: campaignIndex.toNumber(),
//                         campaignAddress: campaignAddress,
//                     }
//                     resolve({
//                         status: 200,
//                         address: camapignCreatedEvent,
//                     })
//                     console.log("camapignCreatedEvent --", camapignCreatedEvent)
//                 }
//             )

//             const txResponse = await connectedContract.createCampaign(
//                 campaignGoal,
//                 minContribution
//             )

//             console.log(txResponse)

//             txReciept = await txResponse.wait(2)
//             console.log(txReciept)

//             console.log(camapignCreatedEvent)

//             if (txReciept.status == 1) {
//                 console.log(camapignCreatedEvent)
//                 retReq = {
//                     status: 200,
//                     address: camapignCreatedEvent.campaignAddress,
//                 }
//                 console.log(retReq)
//             } else {
//                 retReq = { status: 400, msg: "txRecipet status is 0" }
//             }
//         } catch (e) {
//             console.log(e)
//             error = e
//             return { status: 400, msg: error }
//         }
//     })
// }

let eventPromise = new Promise((resolve, reject) => {
    // This promise is resolved when the "CampaignCreated" event is triggered
})

async function CreateCampaignUtil(campaignGoal, address, minContribution = 0) {
    await ConnectToContract()

    let txReciept, camapignCreatedEvent

    try {
        let accounts = await provider.send("eth_requestAccounts", [])

        let account = accounts[0]

        // if (
        //     address.toString().toUpperCase() ===
        //     account.toString().toUpperCase()
        // ) {
        //     return {
        //         status: 400,
        //         msg: "address does not match with metamask wallet",
        //     }
        // }

        await contract.on(
            "CampaignCreated",
            (ownerAddress, campaignIndex, campaignAddress) => {
                camapignCreatedEvent = {
                    owner: ownerAddress,
                    campaignId: campaignIndex.toNumber(),
                    campaignAddress: campaignAddress,
                }
                console.log(camapignCreatedEvent)
            }
        )
        const txResponse = await connectedContract.createCampaign(
            campaignGoal,
            minContribution
        )

        console.log(txResponse)

        txReciept = await txResponse.wait(BlockWaitTime)

        console.log(txReciept)
    } catch (e) {
        console.log(error)
        error = e
    }
    // console.log(txReciept)

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
