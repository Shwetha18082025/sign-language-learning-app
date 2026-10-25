import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const options = [
    { id: 1, title: "Learn", icon: "📚", color: "bg-blue-500" },
    { id: 2, title: "Progress", icon: "📈", color: "bg-green-500" },
    { id: 3, title: "Quiz", icon: "🧠", color: "bg-purple-500" },
    { id: 4, title: "About", icon: "ℹ️", color: "bg-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-10 text-center">
        Welcome to SignLearn 👋
      </h1>

      {/* Feature grid */}
      <div className="grid grid-cols-2 gap-8">
        {options.map((opt) => (
          <div
            key={opt.id}
            onClick={() => navigate(`/${opt.title.toLowerCase()}`)}
            className={`${opt.color} text-white w-40 h-40 rounded-2xl flex flex-col items-center justify-center shadow-lg hover:scale-105 transition transform cursor-pointer`}
          >
            <div className="text-5xl mb-2">{opt.icon}</div>
            <h2 className="text-xl font-semibold">{opt.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
