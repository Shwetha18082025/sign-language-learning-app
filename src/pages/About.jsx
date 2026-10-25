import BackButton from "../components/BackButton";

function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 px-6 py-10 fade-in">
      <div className="max-w-3xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 relative">
        <BackButton />

        <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-6 text-center">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">SignLearn</span> 🤟
        </h1>

        <p className="text-lg leading-relaxed text-center mb-8 text-gray-700 dark:text-gray-300">
          <span className="font-semibold text-blue-500 dark:text-blue-400">SignLearn</span> is an
          interactive web application that helps users learn the basics of sign
          language in a fun and simple way. It offers visual lessons, quizzes,
          progress tracking, and a friendly interface suitable for all age groups.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-6 mb-3">
          ✨ Our Mission
        </h2>
        <p className="text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
          Communication is the bridge that connects people. <span className="font-semibold">SignLearn</span> aims to make that bridge inclusive by teaching
          sign language digitally — helping users connect with the hearing-impaired
          community and spread awareness of visual communication.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-6 mb-3">
          🧠 Key Features
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-8 text-gray-700 dark:text-gray-300">
          <li>📚 Learn alphabets with visual sign images (A–Z)</li>
          <li>🧩 Interactive quizzes with hints and feedback</li>
          <li>📈 Track your learning progress with charts</li>
          <li>🌗 Light/Dark mode with saved user preferences</li>
          <li>💡 Local data storage for offline continuity</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-6 mb-3">
          👩‍💻 Developer
        </h2>
        <p className="text-base leading-relaxed mb-8 text-gray-700 dark:text-gray-300">
          Developed by <span className="font-semibold">Shwetha L</span> as part
          of the <span className="font-semibold">Mobile Application Development (MAD)</span> project.
          The goal is to make learning sign language easy, accessible, and engaging — 
          combining technology with empathy and inclusivity.
        </p>

        <div className="border-t border-gray-300 dark:border-gray-700 pt-4 mt-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} <span className="font-semibold text-blue-500 dark:text-blue-400">SignLearn</span>.  
            All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
