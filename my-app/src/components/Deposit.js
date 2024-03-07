import React, { useState } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import Api from "../api/apiTransactions";

const DepositForm = ({ token }) => {
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const blueColor = "#0766AD";

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      // Make the API call with the correct method for withdrawal
      const response = await Api.deposit(toAccountId, amount, token);

      if (!response) {
        console.warn("API response is undefined or null");
        return;
      }

      // Access the properties you need directly from the response
      const { message, newBalance } = response;

      console.log("Message from API:", message);
      console.log("New Balance from API:", newBalance);

      // Perform additional actions based on the API response
      setAmount("");
      // Reload the page or perform other actions if needed
      window.location.reload();


    } catch (error) {
      console.error("Error handling deposit:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Server Error");
      }
    }
  };

  return (
    <div
      style={{
        marginLeft: "40px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        marginRight: "50px",
        marginTop: "0px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "white",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        style={{ color: blueColor, fontWeight: "bold" }}
      >
        Deposit
      </Typography>
      {error && (
        <Typography variant="body1" color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <form onSubmit={handleDeposit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              label="Amount"
              variant="outlined"
              fullWidth
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ backgroundColor: "white" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
            Deposit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default DepositForm;
