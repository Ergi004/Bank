const express = require('express');
const router = express.Router();
const transactions = require('../controllers/transactionsController');
const decoded = require('../middleware/authMiddleware');

router.post('/deposit', decoded , transactions.deposit);
router.post('/withdraw', decoded, transactions.withdraw);
router.post('/transfer', decoded, transactions.transfer);
router.get('/allTransactions', decoded, transactions.getTransactionsByAccountId);
router.get('/balance', decoded, transactions.getBalanceByAccountId);
router.get('/chart', decoded, transactions.getBalanceHistoryByAccountId);


module.exports = router;