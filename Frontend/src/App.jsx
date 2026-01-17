import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import AnalysisPage from "./pages/Literature/AnalysisPage";
import HistoryPage from "./pages/Literature/HistoryPage";
import UserProvider from './context/userContext';

const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route path="/analyze" element={<AnalysisPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Router>

      <Toaster
    toastOptions={{
    className:"",
    style: {
      fontSize: "13px",
    },
  }}
  />
</div>
</UserProvider>
  )
}

export default App;