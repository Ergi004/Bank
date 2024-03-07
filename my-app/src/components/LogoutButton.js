import React from "react";
import { useNavigate } from "react-router-dom";
import Api from "../api/apiAuth";
import { Button } from "@mui/material";
const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await Api.logout();
      localStorage.removeItem("token");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <Button color="error" variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
};
export default LogoutButton;
