import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Contact from "./views/ContactUs";
import FAQ from "./views/FAQ";
import Login from "./views/Login";
import Registration from "./views/Registration";
import Password from "./views/PasswordReset";
import NavBar from "./utils/NavBar";
import PersonalTransaction from "./views/PersonalTransaction/PersonalTransaction";
import AddTransaction from "./views/PersonalTransaction/AddTransaction";
import GroupExpenseDashboard from "./views/GroupExpensesDashboard";
import GroupHistory from "./views/GroupHistory";
import LandingPage from "./views/LandingPage";
import Trends from "./views/DisplayTrend";
import Profile from "./views/ProfilePage";
import CalendarView from "./views/CalenderView";

const Router = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/passwordreset" element={<Password />} />
      <Route path="/" element={<NavBar />}>
        <Route path="/homepage" element={<LandingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/personal" element={<PersonalTransaction />} />
        <Route path="/addTransaction" element={<AddTransaction />} />
        <Route
          path="/GroupExpenseDashboard"
          element={<GroupExpenseDashboard />}
        />
        <Route path="/calender" element={<CalendarView />} />
        <Route path="/GroupHistory" element={<GroupHistory />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default Router;