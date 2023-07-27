const express = require("express");
const personalTransactionController = require("../controllers/personal-transaction");
const userController = require("../controllers/userController");
const userFriendsController = require("../controllers/user-friends");
const groupDetailsController = require("../controllers/group-details");

const router = express.Router();

router.route("/users/register").post(userController.register);

router.route("/users/login").post(userController.login);

router
  .route("/personalTransaction/add")
  .post(personalTransactionController.addPersonalTransaction);
router
  .route("/personalTransaction/:transactionId")
  .get(personalTransactionController.getPersonalTransaction);
router
  .route("/personalTransactions")
  .post(personalTransactionController.getPersonalTransactions);
router
  .route("/personalTransaction/update/:transactionId")
  .put(personalTransactionController.updatePersonalTransaction);
router
  .route("/personalTransaction/delete/:transactionId")
  .delete(personalTransactionController.deletePersonalTransaction);

router.route("/users/getFriends").post(userFriendsController.getFriends);

router.route("/groups/:userId").get(groupDetailsController.getGroupDetails);

module.exports = router;
