const groupTransaction = require("../models/groupTransactions");
const uuid = require("uuid");

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

module.exports = { addGroupTransaction };
