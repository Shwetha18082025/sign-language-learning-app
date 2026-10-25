import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";

function Progress() {
  const categories = ["Alphabets", "Numbers", "Colors", "Family"];
  const totalItems = {
    Alphabets: 26,
    Numbers: 10,
    Colors: 10,
    Family: 10,
  };

  const [completed, setCompleted] = useState({});
  const [bestScore, setBestScore] = useState(0);

  // Load progress and quiz data
  useEffect(() => {
    const saved = localStorage.getItem("completedSigns");
    if (saved) setCompleted(JSON.parse(saved));

    const storedBest = localStorage.getItem("bestScore");
    if (storedBest) setBestScore(Number(storedBest));
  }, []);

  // Calculate totals
  const totalLearned = Object.values(completed)
    .map((arr) => arr?.length || 0)
    .reduce((a, b) => a + b, 0);

  const totalPossible = Object.values(totalItems).reduce((a, b) => a + b, 0);
  const progressPercent = ((totalLearned / totalPossible) * 100).toFixed(1);

  const getCategoryProgress = (cat) => {
    const learned = completed[cat]?.length || 0;
    const total = totalItems[cat];
    return ((learned / total) * 100).toFixed(1);
  };

  // Reset all progress
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all progress?")) {
      localStorage.removeItem("completedSigns");
      localStorage.removeItem("bestScore");
      setCompleted({});
      setBestScore(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-10 transition-all duration-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <BackButton />
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Your Progress Overview 📘
          </h2>
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition shadow-md"
          >
            Reset
          </button>
        </div>

        {/* Overall Stats */}
        <div className="text-center mb-10">
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            You’ve learned{" "}
            <span className="text-green-600 dark:text-green-400">
              {totalLearned}
            </span>{" "}
            out of{" "}
            <span className="text-blue-600 dark:text-blue-400">
              {totalPossible}
            </span>{" "}
            signs.
          </p>

          <div className="relative w-2/3 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            Total Progress: <b>{progressPercent}%</b>
          </p>

          <p className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-2">
            🏆 Best Quiz Score: {bestScore}%
          </p>

          <p className="italic text-gray-600 dark:text-gray-400">
            {progressPercent < 30
              ? "Keep going — every step counts! 🌱"
              : progressPercent < 70
              ? "Halfway there! Stay consistent 💪"
              : progressPercent < 100
              ? "Almost done! You're doing amazing 🌟"
              : "Perfect! You’ve mastered all the signs 🏅"}
          </p>
        </div>

        {/* Category Breakdown */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-inner">
          <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-6 text-center">
            Category Progress 📚
          </h3>

          <div className="space-y-6">
            {categories.map((cat) => {
              const progress = getCategoryProgress(cat);
              return (
                <div key={cat}>
                  <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <span>{cat}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8">
          🌈 Learning sign language is a journey — keep practicing and spreading awareness!
        </p>
      </div>
    </div>
  );
}

export default Progress;
