const express = require("express");
const addData = require("../controllers/SampleController/add-data");
const findData = require("../controllers/SampleController/find-data");
const personalTransactionController = require("../controllers/personal-transaction");

const router = express.Router();

router.route("/addData").post(addData);
router.route("/findData").get(findData);
router
  .route("/personalTransaction/add")
  .post(personalTransactionController.addPersonalTransaction);
router
  .route("/personalTransaction/:transactionId")
  .get(personalTransactionController.getPersonalTransaction);
router
  .route("/personalTransactions")
  .get(personalTransactionController.getPersonalTransactions);
router
  .route("/personalTransaction/update/:transactionId")
  .put(personalTransactionController.updatePersonalTransaction);

module.exports = router;
