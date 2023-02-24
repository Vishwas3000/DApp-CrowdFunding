const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const path = require("path");


router.get("/", campaignController.index);
router.get("/getAllCampaigns", campaignController.getAllCampaign);
router.get("/getCampaignById", campaignController.getCampaignById);
router.get("/getCampaignByCategory", campaignController.getCampaignByCategory);
router.get("/getCampaignByStatus", campaignController.getCampaignByStatus);
router.post("/createCampaign",campaignController.createCampaign);
router.delete("/deleteCampaignById", campaignController.deleteCampaignById);
router.post("/updateStatusById",campaignController.changeStatusById);
router.post("/updateTargetById",campaignController.updateTargetById);

module.exports = router;