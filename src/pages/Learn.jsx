import { useState } from "react";
import BackButton from "../components/BackButton";

function Learn() {
  const categories = ["Alphabets", "Numbers", "Colours", "Family Members"];
  const [activeCategory, setActiveCategory] = useState("Alphabets");

  const data = {
    Alphabets: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    Numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    Colours: ["red", "blue", "green", "yellow", "orange", "pink", "purple", "black", "white", "brown"],
    "Family Members": [
      "mom", "dad", "brother", "sister",
      "grandma", "grandpa", "uncle", "aunt",
      "son", "daughter"
    ],
  };

  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("completedSigns");
    return saved ? JSON.parse(saved) : {};
  });

  const handleComplete = (category, item) => {
    const updated = { ...completed };
    if (!updated[category]) updated[category] = [];
    if (!updated[category].includes(item)) {
      updated[category].push(item);
      setCompleted(updated);
      localStorage.setItem("completedSigns", JSON.stringify(updated));
    }
  };

  const handleReset = (category) => {
    if (window.confirm(`Reset all learned ${category.toLowerCase()}?`)) {
      const updated = { ...completed, [category]: [] };
      setCompleted(updated);
      localStorage.setItem("completedSigns", JSON.stringify(updated));
    }
  };

  const getImagePath = (category, item) => {
    const base = `${process.env.PUBLIC_URL}/signs`;
    switch (category) {
      case "Alphabets":
        return `${base}/alphabets/${item}.jpeg`;
      case "Numbers":
        return `${base}/numbers/${item}.jpeg`;
      case "Colours":
        return `${base}/colors/${item}.jpg`;
      case "Family Members":
        return `${base}/family/${item}.jpg`;
      default:
        return `${base}/placeholder.jpeg`;
    }
  };

  const currentData = data[activeCategory] || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-6 sm:px-10">
      {/* Header */}
      <div className="flex items-center justify-between py-4">
        <BackButton />
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center flex-grow">
          Learn Sign Language 📘
        </h2>
        <button
          onClick={() => handleReset(activeCategory)}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition"
        >
          🔁 Reset {activeCategory.toLowerCase()}
        </button>
      </div>

      {/* Category Buttons */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-lg font-semibold shadow-md transition ${
              activeCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid — fixed 4 per row */}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
          {currentData.map((item) => (
            <div
              key={item}
              className={`p-4 rounded-xl text-center shadow-md border transition transform hover:scale-105 w-64 ${
                completed[activeCategory]?.includes(item)
                  ? "bg-green-100 border-green-400"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              }`}
            >
              <img
                src={getImagePath(activeCategory, item)}
                alt={item}
                className="mx-auto h-40 w-40 object-cover mb-3 rounded-lg shadow-sm bg-white"
                onError={(e) => (e.target.src = `${process.env.PUBLIC_URL}/signs/placeholder.jpeg`)}
              />
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100 capitalize">
                {item}
              </h3>
              <button
                onClick={() => handleComplete(activeCategory, item)}
                className={`px-4 py-1 rounded-md text-white font-medium transition ${
                  completed[activeCategory]?.includes(item)
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={completed[activeCategory]?.includes(item)}
              >
                {completed[activeCategory]?.includes(item)
                  ? "Completed"
                  : "Mark as Learned"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Learn;
