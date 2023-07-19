import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dummy from "../views/GroupExpenses/index";
import Contact from "../views/ContactUs/index";
import NavBar from "../utils/NavBar";

const Router = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<NavBar />}>
        <Route path="/" element={<Dummy />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
};

export default Router;
