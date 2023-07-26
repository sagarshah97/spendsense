const groupTransaction = require("../models/groupTransactions");
const group = require("../models/groups");
const uuid = require("uuid");
const mongoose = require("mongoose");

const addGroupTransaction = async (req, res) => {
  const currentUserId = "123";
  const transactionId = uuid.v4();
  try {
    let transactionData = {
      group: 123,
      note: "test",
      date: "2023-07-25",
      splitAmounts: [
        { userid: "1", amount: 50 },
        { userid: "2", amount: 50 },
      ],
    }; //req.body.transactiondata; //[{},{}]
    const transactions = transactionData.splitAmounts.map((splitAmount) => {
      return {
        transactionId,
        groupId: transactionData.group,
        description: transactionData.note,
        paidByUserId: currentUserId,
        userId: splitAmount.userid,
        amount: splitAmount.amount,
        settledUp: false,
        timestamp: transactionData.date,
      };
    });
    console.log(transactions);
    transactions.forEach(async (transaction) => {
      transaction.transactionId = transactionId;
      await groupTransaction.insertMany(transaction);
    });
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      failure: true,
    });
  }
};

const userAmountData = async (req, res) => {
  const currentUserId = "64bf4c863528564d5a7aa3b3";
  try {
    let result = { whatIOwe: [], whatImOwed: [] };
    const owedData = await groupTransaction.find({
      paidByUserId: currentUserId,
    });
    const oweData = await groupTransaction.find({
      userId: currentUserId,
    });

    for (const transaction of owedData) {
      let amount = transaction.amount;
      let groupDetails = await group.find({
        _id: new mongoose.Types.ObjectId(transaction.groupId),
      });
      let user = {}; //await user.findById();
      let groupName = groupDetails[0].name;
      let name = "testname"; //user.name;
      result.whatImOwed.push({ name, amount, group: groupName });
    }

    for (const transaction of oweData) {
      let amount = transaction.amount;
      let groupDetails = await group.find({
        _id: new mongoose.Types.ObjectId(transaction.groupId),
      });
      let user = {}; //await user.findById();
      let groupName = groupDetails.name;
      let name = "testname"; //user.name;
      result.whatIOwe.push({ name, amount, group: groupName });
    }

    console.log(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      failure: true,
    });
  }
};

const addGroup = async (req, res) => {
  try {
    let members = req.body.userids; //["64bf4d6e3528564d5a7aa3b5", "64bf4d7f3528564d5a7aa3b6"];
    let name = req.body.name; //["1","2","3"]
    let newGroup = { members, name };
    await group.insertMany(newGroup);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      failure: true,
    });
  }
};
module.exports = { addGroupTransaction, userAmountData, addGroup };
