const { network, ethers } = require("hardhat")
const { verify } = require("../utils/verify")
const { hre } = require("hardhat")
const {
    developmentChains,
    networkconfig,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config")

const CAMPAGIN_GOAL = ethers.utils.parseEther("1000")
const MINIMUM_CONTRIBUTION = ethers.utils.parseEther("0.01")
const BLOCK_CONFORMATION = VERIFICATION_BLOCK_CONFIRMATIONS

module.exports = async (hre) => {
    const { getNamedAccounts, deployments } = hre
    const { deployer1, deployer2, deployer3 } = await getNamedAccounts()
    const { log, deploy } = deployments
    const chainId = network.config.chainId

    log("----------")
    log(`deployer ${deployer2}`)
    log("----------")

    // const library = await deploy("CampaignLib", {
    //     from: deployer1,
    //     args: [],
    //     log: true,
    //     waitConfirmation: BLOCK_CONFORMATION,
    // })

    // const stake = await deploy("Stake", {
    //     from: deployer1,
    //     args: [],
    //     log: true,
    //     waitConfirmation: BLOCK_CONFORMATION,
    // })

    const crowdFundingContract = await deploy("CrowdFunding", {
        from: deployer2,
        args: [],
        log: true,
        waitConfirmation: BLOCK_CONFORMATION,
    })

    const campaignContract = await deploy("Campaign", {
        from: deployer2,
        args: [CAMPAGIN_GOAL, MINIMUM_CONTRIBUTION],
        log: true,
        waitConfirmation: BLOCK_CONFORMATION,
    })

    const contract = await ethers.getContract("CrowdFunding")
    let addressSigner = await ethers.getSigner(deployer2)
    let crowdFunding = contract.connect(addressSigner)

    const campaignCreation = await crowdFunding.createCampaign(
        CAMPAGIN_GOAL,
        MINIMUM_CONTRIBUTION
    )
    const campaignAddress = await crowdFunding.getCampaign(deployer2, 0)
    const totalCampaignCreated = await crowdFunding.getTotalCampaign()

    log(`--------------------campaign1----------------`)
    log(`The create campaign address ${campaignAddress}`)
    log(`Total campaign ${totalCampaignCreated}`)

    log("------------------------------------")

    log(`address of the crowdfunding ${crowdFundingContract.address}`)
    log(`address of the campaign ${campaignContract.address}`)
    log("------------------------------------")

    if (!developmentChains.includes(network.name)) {
        log("Verifying...")

        await verify(campaignCreation.address, [
            CAMPAGIN_GOAL,
            MINIMUM_CONTRIBUTION,
        ])
        await verify(crowdFundingContract.address, [])
    }
}

module.exports.tags = ["all", "crowdFunding"]
