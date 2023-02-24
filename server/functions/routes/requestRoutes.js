const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');


router.get("/getAllRequestBycid", requestController.getAllRequestBycid);
router.post("/createRequest", requestController.createRequest);

module.exports = router;

