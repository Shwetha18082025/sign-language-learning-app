import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";

function Quiz() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const numbers = Array.from({ length: 10 }, (_, i) => i.toString());
  const colors = ["red", "blue", "green", "yellow", "orange", "pink"];
  const family = [
    "aunt", "brother", "daughter", "father", "grandma",
    "grandpa", "mom", "sister", "son", "uncle"
  ];

  const allSigns = [...alphabet, ...numbers, ...colors, ...family];

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [bestScore, setBestScore] = useState(
    () => Number(localStorage.getItem("bestScore")) || 0
  );
  const [showHint, setShowHint] = useState(false);

  // 🧠 Generate 5 random quiz questions
  useEffect(() => {
    const shuffled = [...allSigns].sort(() => 0.5 - Math.random());
    const selectedLetters = shuffled.slice(0, 5);

    const quizData = selectedLetters.map((letter) => {
      const options = [letter];
      while (options.length < 4) {
        const random = allSigns[Math.floor(Math.random() * allSigns.length)];
        if (!options.includes(random)) options.push(random);
      }
      return { letter, options: options.sort(() => 0.5 - Math.random()) };
    });

    setQuestions(quizData);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 🧩 Determine which folder the sign belongs to
  const getImagePath = (letter) => {
    const base = `${process.env.PUBLIC_URL}/signs`;
    if (alphabet.includes(letter)) return `${base}/alphabets/${letter}.jpeg`;
    if (numbers.includes(letter)) return `${base}/numbers/${letter}.jpeg`;
    if (colors.includes(letter)) return `${base}/colors/${letter}.jpg`;
    if (family.includes(letter)) return `${base}/family/${letter}.jpg`;
    return `${base}/placeholder.jpeg`;
  };

  const handleAnswer = (choice) => {
    if (selected) return;
    setSelected(choice);
    if (choice === questions[current].letter) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
      setShowHint(false);
    } else {
      setShowResult(true);
      const percent = (((score + (selected === questions[current].letter ? 1 : 0)) / questions.length) * 100).toFixed(1);
      if (percent > bestScore) {
        localStorage.setItem("bestScore", percent);
        setBestScore(percent);
      }
    }
  };

  const previousQuestion = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(null);
      setShowHint(false);
    }
  };

  const handleHint = () => {
    setShowHint(true);
    setTimeout(() => setShowHint(false), 1500);
  };

  if (questions.length === 0)
    return <p className="text-center mt-20 text-gray-600">Loading quiz...</p>;

  if (showResult) {
    const percent = ((score / questions.length) * 100).toFixed(1);
    return (
      <div className="text-center mt-20">
        <BackButton />
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Quiz Completed 🎉</h2>
        <p className="text-lg mb-2">
          You scored <span className="text-green-600 font-semibold">{score}</span> /
          {questions.length} ({percent}%)
        </p>
        <p className="text-md text-gray-600 mb-2">
          Best Score: <span className="text-blue-600 font-semibold">{bestScore}%</span>
        </p>

        <button
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  const currentQuestion = questions[current];
  const imagePath = getImagePath(currentQuestion.letter);

  return (
    <div className="flex flex-col items-center mt-20">
      <BackButton />
      <h2 className="text-3xl font-bold text-blue-600 mb-6">
        Question {current + 1} of {questions.length}
      </h2>

      {/* 🖼️ Sign Image */}
      <img
        src={imagePath}
        alt="Sign"
        className="h-40 w-40 object-contain mb-6 border rounded-lg shadow-md bg-white"
        onError={(e) => (e.target.src = `${process.env.PUBLIC_URL}/signs/placeholder.jpeg`)}
      />

      {/* 💡 Hint */}
      {showHint && (
        <p className="text-green-600 font-semibold mb-3 animate-pulse">
          💡 Hint: The answer is "{currentQuestion.letter}"
        </p>
      )}

      {/* Options */}
      <div className="grid grid-cols-2 gap-4 w-64">
        {currentQuestion.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(option)}
            disabled={!!selected}
            className={`py-2 rounded-lg text-white font-semibold transition shadow-md ${
              selected
                ? option === currentQuestion.letter
                  ? "bg-green-500"
                  : option === selected
                  ? "bg-red-500"
                  : "bg-gray-400"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={previousQuestion}
          disabled={current === 0}
          className={`px-4 py-2 rounded-lg text-white ${
            current === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-600 hover:bg-gray-700"
          }`}
        >
          ⬅️ Previous
        </button>

        <button
          onClick={handleHint}
          disabled={showHint}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
        >
          💡 Hint
        </button>

        <button
          onClick={nextQuestion}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {current + 1 === questions.length ? "See Results" : "Next ➡️"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
