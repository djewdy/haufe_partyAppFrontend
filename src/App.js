import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import PartyForm from "./components/Party/PartyForm";
import PartyList from "./components/Party/PartyList";
import PartyDetail from "./components/Party/PartyDetail";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/parties" element={<PartyList />} />
        <Route path="/party/new" element={<PartyForm />} />
        <Route path="/party/:id" element={<PartyDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
