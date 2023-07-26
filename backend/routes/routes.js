const express = require("express");
// const addData = require("../controllers/SampleController/add-data");
// const findData = require("../controllers/SampleController/find-data");
const personalTransactionController = require("../controllers/personal-transaction");
const { addGroup } = require("../controllers/group");
const {
  addGroupTransaction,
  userAmountData,
} = require("../controllers/group-transaction");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/users/register").post(userController.register);
router.route("/users/login").post(userController.login);
// router.route("/addData").post(addData);
// router.route("/findData").get(findData);
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
router.route("/userAmountData").get(userAmountData);

module.exports = router;
