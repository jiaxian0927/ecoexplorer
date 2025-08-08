import "./QuizSection.css";
import ArrowForward from "../../assets/arrowForward.tsx";
import Button from "../../components/Button.tsx";
import { Link } from "react-router-dom";

function EngageSection() {
  return (
    <section className="flex justify-center items-center bg-white">
      <div className="flex flex-row items-center justify-center py-20 gap-24">
        <div className="flex flex-col gap-6 justify-center">
          <p className="text-6xl -translate-x-2">🧠</p>
          <div className="flex flex-col gap-5">
            {/*Headline*/}
            <h1 className="text-6xl font-semibold max-w-[450px] text-balance">
              Earth Defender Quiz
            </h1>
            {/*Subheadlines*/}
            <div className="text-xl font-normal leading-snug text-balance">
              <h2>Think you know how to save the planet?</h2>
              <h2>Take the quiz and prove you're an Earth Defender!</h2>
            </div>
          </div>
          {/*CTA Button*/}
          <Link to="/quiz">
            <Button
              cta="Start Quiz"
              className="py-3 rounded-3xl w-[220px] flex flex-row items-center justify-center gap-3 text-2xl"
              level="primary"
            >
              <ArrowForward />
            </Button>
          </Link>
        </div>
        <div className="bg-center bg-cover bg-[url(./assets/communityInvolvement.jpg)] w-[350px] h-[600px] rounded-3xl shadow-2xl"></div>
      </div>
    </section>
  );
}

export default EngageSection;
