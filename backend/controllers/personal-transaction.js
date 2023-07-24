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

module.exports = addPersonalTransaction;
