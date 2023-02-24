const Request = require("../models/request")


exports.getAllRequestBycid = async (req,res)=>{
    const cid = req.query.cid;
    //console.log(cid);
    const results = await Request.find({cid:cid});
    res.send(results);
}
exports.createRequest = async (req, res) => {
    //console.log(req);
    const requestInstance = new Request(
      { 
        rid: req.body.rid,
        cid: req.body.cid,
        info: req.body.info,
        amount:req.body.amount,
        // date:req.body.date,
        status:req.body.status,
        // profile_path: req.file.filename 
      });
    await requestInstance.save();
    res.send(requestInstance);
  }