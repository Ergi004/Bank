import React, { useState } from "react";
import { Grid, Typography } from "@mui/material"; // Import Material-UI components
import TransactionList from "../components/TransactionList";
import Balance from "../components/Balance";
import Logout from "../components/LogoutButton";
import TransferForm from "../components/TransferForm";
import Chart from "../components/Chart";
import Withdrawal from "../components/Withdrawal";
const lightGreenColor = "#E1ECC8";
const GreenColor = "#0766AD";
const RedColor = "#ff4d4d";
const Account = () => {
  return (
    <div style={{ backgroundColor: lightGreenColor }}>
      <div
        style={{
          width: "100%",
          position: "relative",
          backgroundColor: GreenColor,
          padding: "10px",
          fontWeight: "bold",
          borderRadius: "1px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.7)",
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          variant="h3"
          style={{
            padding: "10px",
            marginBottom: "10",
            color: "white",
            marginLeft: "25px",
            fontWeight: "bold",
            fontSize: "25px",
          }}
        >
          Dashboard
        </Typography>
        <Logout />
        {/* Additional content if needed */}
      </div>
      <Grid style={{ padding: "20px" }} container spacing={7}>
        <Grid item xs={12} />
        <Grid item xs={12} sm={3}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Balance />
            </Grid>
            <Grid item xs={12}>
              <TransferForm />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Chart />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Withdrawal />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <TransactionList />
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
