import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dummy from "./views/GroupExpenses/index";
import Contact from "./views/ContactUs/index";
import NavBar from "./utils/NavBar";
import PersonalTransaction from "./views/PersonalTransaction/PersonalTransaction";
import AddTransaction from "./views/PersonalTransaction/AddTransaction";
import GroupExpenseDashboard from "./views/GroupExpensesDashboard";
import GroupHistory from "./views/GroupHistory";
const Router = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<NavBar />}>
        <Route path="/" element={<Dummy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/personal" element={<PersonalTransaction />} />
        <Route path="/addTransaction" element={<AddTransaction />} />
        <Route
          path="/GroupExpenseDashboard"
          element={<GroupExpenseDashboard />}
        />
        <Route path="/GroupHistory" element={<GroupHistory />} />
      </Route>
    </Routes>
  );
};

export default Router;
