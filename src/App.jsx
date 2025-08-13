import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SleepScreen from "./screens/SleepScreen";
import ScanningScreen from "./screens/scanningScreen";
import StatisticsScreen from "./screens/statisticsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ResultScreen from "./screens/ResultScreen";
import BottomTabBar from "./components/bottomTabBar";

const AppLayout = () => (
  <>
    <Routes>
      <Route path="/" element={<SleepScreen />} />
      <Route path="/scan" element={<ScanningScreen />} />
      <Route path="/statistics" element={<StatisticsScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
    </Routes>
    <BottomTabBar />
  </>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/result" element={<ResultScreen />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}
