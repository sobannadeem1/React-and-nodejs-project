import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./assets/Signup";
import Login from "./assets/Login";
import Home from "./assets/Home";
import Logout from "./assets/Logout";
import Addproduct from "./assets/Addproduct";
import Product from "./assets/Product";
import Update from "./assets/Update";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/product" element={<Product />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </>
  );
};

export default App;
