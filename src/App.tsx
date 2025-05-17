import { Routes, Route } from "react-router-dom";

import "./App.css";
import Calculator from "./components/Calculator";
import ActivityLevelHint from "./components/ActivityLevelHint";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Calculator />} />
      <Route path="/activity-level-hint" element={<ActivityLevelHint />} />
    </Routes>
  )
};

export default App;
