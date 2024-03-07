import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Account from "./pages/Account";
import { Navigate } from "react-router-dom";

const App = () => {
  const [token] = useState(localStorage.getItem("token"));

  const isAuthenticated = !!token;

  return (
    <Router>
      <Routes>
      {!isAuthenticated ? (
        <Route path="/" element={<Login />} />
      ) : (
        <Route exact path="/account" element={<Account/>}/>
      )}
      </Routes>
    </Router>
  );
};

export default App;
