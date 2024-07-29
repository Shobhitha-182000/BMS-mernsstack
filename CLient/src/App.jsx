import { useState } from "react";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Signup from "./components/Pages/Signup";
import Login from "./components/Pages/Login";
import Dashboard from "./components/MainPage/Dashboard/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GenerateInvoice from "./components/MainPage/Invoice/GenerateInvoice";
import GetInvoice from "./components/MainPage/DisplayInvoices/GetInvoice";

function App() {
  return (
     <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/saveinvoice" element={<GenerateInvoice />} />
        <Route path="/user/getinvoice" element={<GetInvoice />} />
       
      </Routes>
    </BrowserRouter>
      <ToastContainer/></>
  );
}

export default App;
