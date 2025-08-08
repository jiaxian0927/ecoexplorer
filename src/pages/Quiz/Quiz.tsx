import "./Quiz.css";
import Button from "../../components/Button";
import { useState } from "react";
import { ScrollToTop } from "../../components/Discover/ScrollHelper";
import TopographySvg from "../../assets/topography.tsx";
import { shuffleArray } from "../../utility/utility";

function Quiz() {
  const questions = [
    {
      category: "Climate Change",
      question:
        "Which process is most responsible for the enhanced greenhouse effect?",
      options: [
        "Volcanic eruptions",
        "Burning fossil fuels",
        "Earth’s orbital changes",
        "Solar flares",
      ],
      answer: "Burning fossil fuels",
    },
    {
      category: "Climate Change",
      question:
        "Which country historically contributes the most to cumulative carbon emissions?",
      options: ["China", "Russia", "India", "United States"],
      answer: "United States",
    },
    {
      category: "Climate Change",
      question: "What does the term 'climate tipping point' refer to?",
      options: [
        "A sudden increase in temperature",
        "A point where climate change becomes irreversible",
        "A seasonal weather event",
        "A renewable energy breakthrough",
      ],
      answer: "A point where climate change becomes irreversible",
    },
    {
      category: "Climate Change",
      question:
        "How much has the global average temperature increased since the late 19th century?",
      options: ["About 0.5°C", "About 1.1°C", "About 2.3°C", "Over 4°C"],
      answer: "About 1.1°C",
    },
    {
      category: "Climate Change",
      question:
        "Which sector contributes the most to global greenhouse gas emissions?",
      options: ["Transport", "Agriculture", "Energy production", "Forestry"],
      answer: "Energy production",
    },
    {
      category: "Deforestation",
      question:
        "What is the primary driver of deforestation in the Amazon rainforest?",
      options: [
        "Mining",
        "Urban development",
        "Cattle ranching",
        "Timber export",
      ],
      answer: "Cattle ranching",
    },
    {
      category: "Deforestation",
      question: "Which of the following is NOT a consequence of deforestation?",
      options: [
        "Loss of biodiversity",
        "Increased carbon sequestration",
        "Soil erosion",
        "Disruption of water cycles",
      ],
      answer: "Increased carbon sequestration",
    },
    {
      category: "Deforestation",
      question: "Which tree-based practice helps reduce deforestation?",
      options: [
        "Slash-and-burn farming",
        "Clear-cutting",
        "Agroforestry",
        "Monoculture",
      ],
      answer: "Agroforestry",
    },
    {
      category: "Deforestation",
      question: "Which continent is losing forest cover at the fastest rate?",
      options: ["Europe", "Asia", "South America", "Africa"],
      answer: "Africa",
    },
    {
      category: "Deforestation",
      question:
        "What percentage of the world’s land area is currently covered by forests (approx.)?",
      options: ["15%", "31%", "47%", "60%"],
      answer: "31%",
    },
    {
      category: "Ocean Pollution",
      question: "What is the most common type of debris found in the ocean?",
      options: ["Plastic", "Glass", "Metal", "Organic waste"],
      answer: "Plastic",
    },
    {
      category: "Ocean Pollution",
      question:
        "Which ocean region is most known for the Great Pacific Garbage Patch?",
      options: [
        "South Atlantic",
        "North Pacific",
        "Indian Ocean",
        "Southern Ocean",
      ],
      answer: "North Pacific",
    },
    {
      category: "Ocean Pollution",
      question:
        "What harmful chemical is commonly found in sunscreen and damages coral reefs?",
      options: ["Oxybenzone", "Paracetamol", "Chlorine", "Formaldehyde"],
      answer: "Oxybenzone",
    },
    {
      category: "Ocean Pollution",
      question: "Which marine organism is most affected by microplastics?",
      options: ["Sharks", "Sea turtles", "Plankton", "Whales"],
      answer: "Plankton",
    },
    {
      category: "Ocean Pollution",
      question: "Which method can best prevent plastic pollution in oceans?",
      options: [
        "Fishing bans",
        "Beach cleanup events",
        "Banning single-use plastics",
        "Shipping restrictions",
      ],
      answer: "Banning single-use plastics",
    },
    {
      category: "Air Pollution",
      question: "Which air pollutant is most associated with vehicle exhaust?",
      options: ["Nitrogen dioxide", "Methane", "CFCs", "Carbon monoxide"],
      answer: "Nitrogen dioxide",
    },
    {
      category: "Air Pollution",
      question: "What is PM2.5 in air pollution terminology?",
      options: [
        "Particles larger than 2.5 mm",
        "Ozone molecules",
        "Particulate matter smaller than 2.5 micrometers",
        "Carbon dioxide emissions",
      ],
      answer: "Particulate matter smaller than 2.5 micrometers",
    },
    {
      category: "Air Pollution",
      question: "Which device is used to reduce emissions from car exhausts?",
      options: ["Inverter", "Compressor", "Catalytic converter", "Air filter"],
      answer: "Catalytic converter",
    },
    {
      category: "Air Pollution",
      question:
        "Which international agreement targets the reduction of ozone-depleting substances?",
      options: [
        "Kyoto Protocol",
        "Montreal Protocol",
        "Paris Agreement",
        "Stockholm Convention",
      ],
      answer: "Montreal Protocol",
    },
    {
      category: "Air Pollution",
      question:
        "Which is a major indoor air pollutant in developing countries?",
      options: [
        "Carbon dioxide",
        "Methane",
        "Cooking smoke from biomass",
        "Nitrous oxide",
      ],
      answer: "Cooking smoke from biomass",
    },
  ];
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] =
    useState<typeof questions>(questions);
  const [score, setScore] = useState(0);

  interface showCorrectAnswerProps {
    correctAnswer: string;
    option: string;
  }

  const showCorrectAnswer = ({
    correctAnswer,
    option,
  }: showCorrectAnswerProps) => {
    if (correctAnswer === option) {
      return "bg-green-100";
    } else {
      return "bg-red-100";
    }
  };

  interface handleAnswerProps {
    selectedOption: string;
    correctAnswer: string;
  }

  const handleAnswer = ({
    selectedOption,
    correctAnswer,
  }: handleAnswerProps) => {
    selectedOption === correctAnswer ? setScore((prev) => prev + 50) : "";
    setShowFeedback(true);

    if (currentQuestion + 1 < questions.length) {
      setTimeout(() => {
        setShowFeedback(false);
        setCurrentQuestion((prev) => prev + 1);
        setProgress((prev) => prev + 5);
      }, 3000);
    } else {
      setQuizStarted(false);
      setQuizCompleted(true);
      setShowFeedback(false);
    }
  };

  const startQuiz = () => {
    const shuffled = questions.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setShuffledQuestions(shuffled);
    setScore(0);
    setProgress(0);
    setCurrentQuestion(0);
    setQuizCompleted(false);
    setQuizStarted(true);
  };

  ScrollToTop();

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-b from-[#edfef0] to-[#d9eddf] relative">
      <TopographySvg className="absolute inset-0 z-0" />
      {quizCompleted ? (
        //Scoreboard
        <div className="px-10 py-8 bg-white/60 rounded-2xl shadow-xl text-center space-y-8 backdrop-blur-sm">
          {/* Celebratory Icon */}
          <div className="">
            <div className="text-5xl animate-bounce pl-4 mb-2">🎉</div>
            {/* Title */}
            <h2 className="text-4xl font-extrabold text-green-700">
              Quiz Complete!
            </h2>
          </div>
          {/* Performance Tier */}
          <div
            className={`text-3xl font-bold ${
              score >= 900
                ? "text-yellow-500"
                : score >= 600
                ? "text-green-600"
                : score >= 300
                ? "text-lime-500"
                : "text-gray-500"
            }`}
          >
            {score >= 900
              ? "🌟 Eco Genius!"
              : score >= 600
              ? "🌱 Earth Ally"
              : score >= 300
              ? "🍃 Eco Explorer"
              : "📚 Keep Learning!"}
          </div>
          {/* Final Score */}
          <div>
            <p className="text-xl text-black font-semibold">
              Your Score:
              <span className="ml-2 inline-block bg-green-100 text-green-700 px-4 py-1 rounded-xl text-xl font-bold shadow-sm">
                {score} points
              </span>
            </p>
          </div>
          {/* Feedback Message */}
          <p className="text-gray-700 max-w-md mx-auto text-balance leading-relaxed">
            {score >= 900
              ? "You're an environmental mastermind! 🌍 Keep up the amazing work!"
              : score >= 600
              ? "Great job! You really know your planet. 🌿 Let’s continue the journey!"
              : score >= 300
              ? "Nice effort! Keep growing your eco-knowledge. 🌱"
              : "Don’t worry — every step you take helps you grow. Try again and learn more! 📘"}
          </p>

          {/* Retry Button */}
          <Button
            cta="Try Again"
            className="py-3 rounded-xl w-full text-xl"
            level="primary"
            onClick={startQuiz}
          />
        </div>
      ) : quizStarted ? (
        //Quiz
        <div className="w-full max-w-2xl p-6 bg-white rounded-2xl shadow-xl space-y-6 backdrop-blur-sm">
          {/*Progress bar*/}
          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
            <div
              className="bg-green-500 h-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between flex-row">
            {/*Question Number*/}
            <h2 className="text-xl font-semibold text-green-700">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            {/*Score*/}
            <p className="text-green-700 font-semibold text-lg bg-green-100 rounded-xl py-1 px-3 -translate-y-1">
              Score: {score}
            </p>
          </div>
          {/*Question*/}
          <p className="text-2xl font-bold text-black">
            {questions[currentQuestion].question}
          </p>
          {/*Options*/}
          <div className="space-y-3 mb-2">
            {shuffledQuestions.length > 0 &&
              shuffledQuestions[currentQuestion].options.map(
                (option, index) => (
                  <button
                    key={index}
                    disabled={showFeedback}
                    onClick={() =>
                      handleAnswer({
                        selectedOption: option,
                        correctAnswer: questions[currentQuestion].answer,
                      })
                    }
                    className={`block w-full text-left p-4 border border-gray-300 rounded-xl transition-all relative ${
                      !showFeedback
                        ? "hover:bg-gray-100 hover:shadow-lg bg-white duration-200"
                        : showCorrectAnswer({
                            correctAnswer: questions[currentQuestion].answer,
                            option: option,
                          })
                    }`}
                  >
                    {option}
                  </button>
                )
              )}
          </div>
        </div>
      ) : (
        //Preview section before starting the quiz
        <div className="p-8 bg-white/60 rounded-2xl shadow-xl text-center space-y-6 backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold">⚔️ Earth Defender Quiz</h2>
          <div className="bg-green-100/60 p-4 rounded-xl text-left shadow-inner">
            <h3 className="font-semibold text-green-700 mb-2">
              📌 What to Expect:
            </h3>
            <ul className="list-none list-inside text-black space-y-1 font-light">
              <li>
                ✅ No time limit – think, learn, and answer at your own pace
              </li>
              <li>✅ See how you perform in each environmental category</li>
              <li>✅ Each correct answer earns you 50 points</li>
            </ul>
          </div>
          <Button
            cta="Quiz Now"
            className="py-3 rounded-xl w-full text-xl"
            level="primary"
            onClick={startQuiz}
          ></Button>
        </div>
      )}
    </section>
  );
}

export default Quiz;
