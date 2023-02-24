const Campaign = require("../models/campaign")



exports.index = (req, res) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
};
exports.getAllCampaign = async (req, res) => {
  const allCampaign = await Campaign.find({});
  res.send(allCampaign);
};
exports.createCampaign = async (req, res) => {
  console.log(req);
  const campaignInstance = new Campaign(
    { 
      name : req.body.name,
      description: req.body.description,
      donation_target: req.body.donation_target, 
      public_key: req.body.public_key,
      category: req.body.category,
      status: req.body.status,
      // profile_path: req.file.filename 
    });
  await campaignInstance.save();
  res.send(campaignInstance);
}
exports.getCampaignById = async (req,res)=>{
  const id = req.query.id;
  const result = await Campaign.findById(id);
  res.send(result);
}
exports.getCampaignByCategory = async (req,res)=>{
  const category = req.query.category;
  const result = await Campaign.find({category: category});
  res.send(result);
}
exports.getCampaignByStatus = async (req,res)=>{
  const status = req.query.status;
  console.log(status);
  const results = await Campaign.find({status:status});
  res.send(results);
}
exports.deleteCampaignById= async (req,res)=>{
  const id = req.query.id;
  console.log(id);
  const result = await Campaign.findByIdAndDelete(id);
  console.log(result);
  res.send(result);
}
exports.changeStatusById = async (req,res)=>{
  // console.log(req);
  const id = req.body.id;
  // console.log(id);
  const campaign = await Campaign.findById(id);
  console.log(campaign);
  campaign.status = req.body.updated_status;
  campaign.save();
  res.send(campaign);
}
exports.updateTargetById = async (req,res)=>{
  // console.log(req);
  const id = req.body.id;
  const deduct = req.body.deduct;
  // console.log(id);
  const campaign = await Campaign.findById(id);
  // console.log(campaign);
  let target = campaign.donation_target;
  target = target-deduct;
  campaign.donation_target = target;
  campaign.save();
  res.send(campaign);
}