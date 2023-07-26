const express = require("express");
const addData = require("../controllers/SampleController/add-data");
const findData = require("../controllers/SampleController/find-data");
const personalTransactionController = require("../controllers/personal-transaction");
const { addGroup } = require("../controllers/group");
const { addGroupTransaction } = require("../controllers/group-transaction");

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
router
  .route("/personalTransaction/delete/:transactionId")
  .delete(personalTransactionController.deletePersonalTransaction);

router.route("/addGroup").post(addGroup);
router.route("/addGroupTransaction").post(addGroupTransaction);

module.exports = router;
