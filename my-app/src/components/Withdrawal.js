import React, { useState } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import Api from "../api/apiTransactions";

const WithdrawForm = ({ token }) => {
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const blueColor = "#0766AD";

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      // Make the API call with the correct method for withdrawal
      const response = await Api.withdraw(toAccountId, amount, token);

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
      console.error("Error handling withdraw:", error);

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
        Withdrawal
      </Typography>
      {error && (
        <Typography variant="body1" color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <form onSubmit={handleWithdraw}>
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
              Withdraw
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default WithdrawForm;
