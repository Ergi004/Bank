import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import Api from '../api/apiAuth';
import axios from "axios";

function Login() {
  const [card_number, setCardNumber] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await Api.login(card_number, pin);

      const token =  await response.token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Inside your login component after successful login
      navigate('/account');
      window.location.reload();

      // You may want to redirect the user or perform other actions based on the response
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error, show a message, etc.
    }
  };

  const backgroundImageUrl =
    "https://images.pexels.com/photos/4025825/pexels-photo-4025825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  const containerStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh", // Set to at least 100% of the viewport height
    display: "flex",
    alignItems: "center",
  };
  return (
    <MDBContainer
      className="justify-content-center"
      fluid
      style={containerStyle}
    >
      <MDBRow md="6">
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        ></MDBCol>

        <MDBCol md="12">
          <MDBCard className="p-5 text-center align-items-center">
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <MDBCardBody className="p-5">
              <div>
                <TextField
                  required
                  fullWidth
                  onChange={(e) => setCardNumber(e.target.value)}
                  value={card_number}
                  id="card_number"
                  label="Card Number"
                  name="card_number"
                  autoComplete="card_number"
                  autoFocus
                />
                <br />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={(e) => setPin(e.target.value)}
                  value={pin}
                  name="pin"
                  label="Pin"
                  type="password"
                  id="pin"
                  autoComplete="current-password"
                />
                <br />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <br />
                <Button variant="contained" size="large" onClick={handleLogin}>
                  Login
                </Button>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
