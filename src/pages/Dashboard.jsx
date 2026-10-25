import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

function Dashboard() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState({ Alphabet: [], Numbers: [], Colors: [] });
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("completedSigns");
    if (saved) setCompleted(JSON.parse(saved));

    const score = localStorage.getItem("bestScore");
    if (score) setBestScore(Number(score));
  }, []);

  const totalLetters = 26;
  const totalNumbers = 10;
  const totalColors = 10;

  const alphabetCount = completed.Alphabet?.length || 0;
  const numberCount = completed.Numbers?.length || 0;
  const colorCount = completed.Colors?.length || 0;

  const alphabetProgress = ((alphabetCount / totalLetters) * 100).toFixed(1);
  const numberProgress = ((numberCount / totalNumbers) * 100).toFixed(1);
  const colorProgress = ((colorCount / totalColors) * 100).toFixed(1);

  const handleExit = () => {
    if (window.confirm("Are you sure you want to exit SignLearn?")) {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 p-8">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10 text-center relative">
        {/* 🔙 Back Button */}
        <div className="absolute left-6 top-6">
          <BackButton />
        </div>

        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-8">
          Your Dashboard 🏠
        </h1>

        {/* 📊 Learning Progress Overview */}
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-xl shadow-md hover:scale-105 transition transform">
            <h2 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">
              Alphabets
            </h2>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {alphabetProgress}%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {alphabetCount}/{totalLetters} learned
            </p>
          </div>

          <div className="p-6 bg-purple-100 dark:bg-purple-900 rounded-xl shadow-md hover:scale-105 transition transform">
            <h2 className="text-lg font-semibold mb-2 text-purple-700 dark:text-purple-300">
              Numbers
            </h2>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {numberProgress}%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {numberCount}/{totalNumbers} learned
            </p>
          </div>

          <div className="p-6 bg-pink-100 dark:bg-pink-900 rounded-xl shadow-md hover:scale-105 transition transform">
            <h2 className="text-lg font-semibold mb-2 text-pink-700 dark:text-pink-300">
              Colors
            </h2>
            <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">
              {colorProgress}%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {colorCount}/{totalColors} learned
            </p>
          </div>
        </div>

        {/* 🧠 Quiz Stats */}
        <div className="p-6 bg-green-100 dark:bg-green-900 rounded-xl shadow-md mb-8 hover:scale-105 transition transform">
          <h2 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
            Best Quiz Score
          </h2>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {bestScore}%
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Keep improving your signing skills 💪
          </p>
        </div>

        {/* 🚀 Quick Navigation Buttons */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => navigate("/learn")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg shadow-md transition"
          >
            📚 Learn
          </button>
          <button
            onClick={() => navigate("/quiz")}
            className="bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg shadow-md transition"
          >
            🧠 Quiz
          </button>
          <button
            onClick={() => navigate("/progress")}
            className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg shadow-md transition"
          >
            📈 Progress
          </button>
        </div>

        {/* 🚪 Exit Button */}
        <button
          onClick={handleExit}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition shadow-md"
        >
          🚪 Exit SignLearn
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
