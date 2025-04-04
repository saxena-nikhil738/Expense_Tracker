const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  getSingleTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

//router object
const router = express.Router();

//routes
//add transaction POST Method
router.post("/add-transaction", addTransaction);

//Edit transaction put  Method

router.post("/edit-transaction", editTransaction);
//Delete transaction POST Method
router.post("/delete-transaction", deleteTransaction);

//get transactions
router.post("/get-transaction", getAllTransaction);

module.exports = router;
