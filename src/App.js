import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Progress from "./pages/Progress";
import Quiz from "./pages/Quiz";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/about" element={<About />} />
        </Routes>
    </Router>
  );
}

export default App;
