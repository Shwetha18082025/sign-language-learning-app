import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Load saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset all progress and quiz data?")) {
      localStorage.clear();
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <nav className="w-full bg-blue-600 dark:bg-gray-800 text-white shadow-md py-3 px-6 flex justify-between items-center transition-all">
      {/* 🔹 Logo */}
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        SignLearn
      </h1>

      {/* 🔹 Navigation Links */}
      <div className="flex items-center space-x-6">
        <Link to="/dashboard" className="hover:text-gray-200 transition">
          Dashboard
        </Link>
        <Link to="/" className="hover:text-gray-200 transition">
          Home
        </Link>
        <Link to="/learn" className="hover:text-gray-200 transition">
          Learn
        </Link>
        <Link to="/progress" className="hover:text-gray-200 transition">
          Progress
        </Link>
        <Link to="/quiz" className="hover:text-gray-200 transition">
          Quiz
        </Link>
        <Link to="/about" className="hover:text-gray-200 transition">
          About
        </Link>
        


        {/* 🌙 Dark/Light Toggle */}
        <button
          onClick={toggleDarkMode}
          className="ml-4 px-3 py-1 bg-white text-blue-600 dark:bg-gray-700 dark:text-yellow-300 font-semibold rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* 🔁 Reset Button */}
        <button
          onClick={handleReset}
          className="px-3 py-1 bg-red-500 rounded-md hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
