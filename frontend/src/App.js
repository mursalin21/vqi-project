import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import LandingPage from "./Screens/LandingPage/LandingPage";
import QaTrackerPage from "./Screens/QaTrackerPage/QaTrackerPage";
import ReportList from "./Screens/ReportList/ReportList";
import AdminLogin from "./Screens/AdminLogin/AdminLogin";
import TaskList from "./Screens/TaskList/TaskList";
import AdminRegister from "./Screens/AdminRegister/AdminRegister";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminRegister" element={<AdminRegister />} />
          <Route path="/taskList" element={<TaskList />} exact />
          <Route path="/qaTracker" element={<QaTrackerPage />} exact />
          <Route path="/reportlist" element={<ReportList />} exact />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
