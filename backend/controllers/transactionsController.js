const db = require("../config/db");

const transactions = {
  deposit: async (req, res) => {
    try {
      const { account_id } = req.user;
      const { amount } = req.body;
      console.log(account_id);
      if (parseFloat(amount) <= 0) {
        return res
          .status(400)
          .json({ message: "Amount must be greater than 0" });
      }
      const [account] = await db
        .promise()
        .query("SELECT * FROM accounts WHERE account_id = ?", [account_id]);
      if (account.length === 0) {
        return res.status(404).json({ message: "Account not found" });
      }
      const currentBalance = parseFloat(account[0].balance);
      const newBalance = currentBalance + parseFloat(amount);
      await db
        .promise()
        .query("UPDATE accounts SET balance = ? WHERE account_id = ?", [
          newBalance,
          account_id,
        ]);
      await db
        .promise()
        .query(
          "INSERT INTO transactions (account_id, transaction_type, amount) VALUES (?, ?, ?)",
          [account_id, "deposit", amount]
        );
      res.status(200).json({ message: "Deposit successful", newBalance });
    } catch (error) {
      console.error("Error during deposit:", error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  withdraw: async (req, res) => {
    try {
      const { account_id } = req.user;
      const { amount } = req.body;

      if (parseFloat(amount) <= 0) {
        return res
          .status(400)
          .json({ message: "Amount must be greater than 0" });
      }

      const [account] = await db
        .promise()
        .query("SELECT * FROM accounts WHERE account_id = ?", [account_id]);

      if (account.length === 0) {
        return res.status(404).json({ message: "Account not found" });
      }

      const currentBalance = parseFloat(account[0].balance);

      if (currentBalance < parseFloat(amount)) {
        return res.status(400).json({ message: "Insufficient funds" });
      }

      const newBalance = currentBalance - parseFloat(amount);

      await db
        .promise()
        .query("UPDATE accounts SET balance = ? WHERE account_id = ?", [
          newBalance,
          account_id,
        ]);
      await db
        .promise()
        .query(
          "INSERT INTO transactions (account_id, transaction_type, amount) VALUES (?, ?, ?)",
          [account_id, "withdraw", amount]
        );

      res.status(200).json({ message: "Withdrawal successful", newBalance });
    } catch (error) {
      console.error("Error during withdrawal:", error);

      if (error instanceof SyntaxError) {
        // Handle specific syntax errors if needed
        return res.status(400).json({ message: "Bad request syntax" });
      }

      res.status(500).json({ message: "Server Error" });
    }
  },
  transfer: async (req, res) => {
    try {
      const { account_id } = req.user;
      const { to_account_id, amount } = req.body;

      if (parseFloat(amount) <= 0) {
        return res
          .status(400)
          .json({ message: "Amount must be greater than 0" });
      }

      // Retrieve account information
      const [fromAccount] = await db
        .promise()
        .query("SELECT * FROM accounts WHERE account_id = ?", [account_id]);
      const [toAccount] = await db
        .promise()
        .query("SELECT * FROM accounts WHERE account_id = ?", [to_account_id]);

      if (account_id == to_account_id) {
        return res
          .status(404)
          .json({ message: "You cant transfer to yourself" });
      }
      console.log("fromAccount:", fromAccount);
      console.log("toAccount:", toAccount);

      if (fromAccount.length === 0 || toAccount.length === 0) {
        return res
          .status(404)
          .json({ message: "One or more accounts not found" });
      }

      const fromBalance = parseFloat(fromAccount[0].balance);

      if (fromBalance < parseFloat(amount)) {
        return res
          .status(400)
          .json({ message: "Insufficient funds for the transfer" });
      }

      const newFromBalance = fromBalance - parseFloat(amount);
      const newToBalance =
        parseFloat(toAccount[0].balance) + parseFloat(amount);

      // Start a transaction to ensure atomicity
      await db.promise().beginTransaction();

      try {
        // Update balances
        await db
          .promise()
          .query("UPDATE accounts SET balance = ? WHERE account_id = ?", [
            newFromBalance,
            account_id,
          ]);
        await db
          .promise()
          .query("UPDATE accounts SET balance = ? WHERE account_id = ?", [
            newToBalance,
            to_account_id,
          ]);

        // Record transactions
        // Record transactions
        await db
          .promise()
          .query(
            "INSERT INTO transactions (account_id, transaction_type, amount) VALUES (?, ?, ?)",
            [account_id, "transfer", amount]
          );
        await db
          .promise()
          .query(
            "INSERT INTO transactions (account_id, transaction_type, amount) VALUES (?, ?, ?)",
            [to_account_id, "transfer", amount]
          );

        // Commit the transaction
        await db.promise().commit();

        res
          .status(200)
          .json({ message: "Transfer successful", newFromBalance });
      } catch (error) {
        // Rollback the transaction in case of an error
        await db.promise().rollback();
        throw error; // Re-throw the error to be caught in the outer catch block
      }
    } catch (error) {
      console.error("Error during transfer:", error);
      res.status(500).json({ message: "Server Error" });
    }
  },
  getTransactionsByAccountId: async (req, res) => {
    try {
      const { account_id } = req.user;
      console.log(account_id);

      const [transactions] = await db
        .promise()
        .query(
          "SELECT * FROM transactions WHERE account_id = ? ORDER BY timestamp DESC",
          [account_id]
        );

      if (transactions.length === 0) {
        return res.status(404).json({
          message: "No transactions found for the specified account ID",
        });
      }

      res.status(200).json({ transactions });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Server Error" });
    }
  },
  getBalanceByAccountId: async (req, res) => {
    try {
      const { account_id } = req.user;
      console.log(account_id);

      const [balanceRows] = await db
        .promise()
        .query("SELECT balance FROM accounts WHERE account_id = ?", [
          account_id,
        ]);

      if (balanceRows.length === 0) {
        return res.status(404).json({ message: "Account not found" });
      }

      const balance = balanceRows[0].balance;
      res.status(200).json({ balance });
    } catch (error) {
      console.error("Error fetching balance:", error);
      res.status(500).json({ message: "Server Error" });
    }
  },
  getBalanceHistoryByAccountId: async (req, res) => {
    try {
      const { account_id } = req.user;

      const [transactions] = await db
        .promise()
        .query(
          "SELECT * FROM transactions WHERE account_id = ? ORDER BY timestamp",
          [account_id]
        );

      let balance = 0;
      const balanceHistory = transactions.map((transaction) => {
        let transactionAmount = parseFloat(transaction.amount);

        if (transaction.transaction_type === "deposit") {
          balance += transactionAmount;
        } else if (
          transaction.transaction_type === "withdraw" ||
          transaction.transaction_type === "transfer"
        ) {
          balance -= transactionAmount;
          console.log("balence----", balance);
        }

        // If the current account is the sender, subtract the amount instead of making the balance negative
        if (transaction.sender_account_id === account_id) {
          balance -= transactionAmount;
        }

        return { timestamp: transaction.timestamp, balance };
      });

      console.log(balanceHistory);
      res.status(200).json({ balanceHistory });
    } catch (error) {
      console.error("Error fetching balance history:", error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};

module.exports = transactions;
