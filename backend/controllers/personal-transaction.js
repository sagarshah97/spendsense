const Transaction = require("../models/transaction");
const uuid = require("uuid");

const addPersonalTransaction = async (req, res) => {
  const { date, amount, category, note, typeOfTransaction } = req.body;
  const transactionId = uuid.v4();
  const newTransaction = new Transaction({
    date: date,
    amount: amount,
    category: category,
    note: note,
    typeOfTransaction: typeOfTransaction,
    transactionId: transactionId,
  });

  newTransaction
    .save()
    .then((savedTransaction) => {
      res.status(200).send(savedTransaction);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getPersonalTransaction = async (req, res) => {
  const transactionId = req.params.transactionId;
  Transaction.findOne({ transactionId: transactionId })
    .then((transaction) => {
      if (!transaction) {
        res
          .status(404)
          .json({ message: "Transaction not found", success: false });
      } else {
        res.status(200).json({
          message: "Transaction successfully retrived",
          success: true,
          transaction: transaction,
        });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getPersonalTransactions = async (req, res) => {
  Transaction.find()
    .exec()
    .then((transactions) => {
      if (!transactions || !transactions.length) {
        return res
          .status(404)
          .json({ success: false, data: "No Transactions found!" });
      }
      return res.status(200).json({
        message: "Transactions retrived",
        success: true,
        transactions: transactions,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = addPersonalTransaction;
module.exports = getPersonalTransaction;
module.exports = getPersonalTransactions;
