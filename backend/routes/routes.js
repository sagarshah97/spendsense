const express = require("express");
const addData = require("../controllers/SampleController/add-data");
const findData = require("../controllers/SampleController/find-data");
const addPersonalTransaction = require("../controllers/personal-transaction");
const router = express.Router();

router.route("/addData").post(addData);
router.route("/findData").get(findData);
router.route("/personalTransaction/add").post(addPersonalTransaction);

module.exports = router;
