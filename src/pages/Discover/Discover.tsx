import "./Discover.css";
import ArrowForward from "../../assets/arrowForward.tsx";
import GlobalWarming from "../../assets/globalWarming.webp";
import Deforestation from "../../assets/deforestation.jpg";
import EndangeredTurtle from "../../assets/endangeredTurtle.avif";
import AirPollution from "../../assets/airPollution.jpg";
import Congrats from "../../assets/congrats.png";
import { Link } from "react-router-dom";
import Button from "../../components/Button.tsx";
import { ScrollToTop } from "../../components/Discover/ScrollHelper.ts";

function Discover() {
  ScrollToTop();

  const EnvironmentCrises = [
    {
      id: 1,
      topic: "Climate Change",
      detail: {
        first: "✅ What is climate change?",
        second: "✅ How climate change impacts the planet?",
        third: "✅ Causes of climate change",
        fourth: "✅ How we can reduce carbon footprints?",
        fifth: "📌 Carbon footprint calculator!",
      },
      bgImage: GlobalWarming,
      link: "/climate-change",
    },
    {
      id: 2,
      topic: "Deforestation",
      detail: {
        first: "✅ Why trees are important?",
        second: "✅ How deforestation impacts the planet?",
        third: "✅ Simple ways to save trees",
        fourth: "✅ Success stories of reforestation projects",
        fifth: "📌 Global Forest Timeline!",
      },
      bgImage: Deforestation,
      link: "/deforestation",
    },
    {
      id: 3,
      topic: "Ocean Pollution",
      detail: {
        first: "✅ How much plastic ends up in the ocean?",
        second: "✅ The impact of microplastics on marine life",
        third: "✅ Biodegradable alternatives to plastic",
        fourth: "✅ Everyday habits to reduce plastic waste",
        fifth: "📌 Turtle’s Plastic Dodge",
      },
      bgImage: EndangeredTurtle,
      link: "/ocean-pollution",
    },
    {
      id: 4,
      topic: "Air Pollution",
      detail: {
        first: "✅ Why tackle air pollution?",
        second: "✅ Types of air pollutants",
        third: "✅ Causes of air pollution",
        fourth: "✅ How we can reduce air pollution?",
        fifth: "📌 Air Quality Index (AQI) across the globe!",
      },
      bgImage: AirPollution,
      link: "/air-pollution",
    },
  ];

  return (
    <>
      <section className="justify-center flex flex-row bg-gradient-to-b from-[#edfef0] to-[#d9eddf] h-[600px] items-center">
        <h1
          className="text-3xl font-medium max-w-5xl text-center text-balance leading-none"
          style={{ animation: "text-enlargement 2s forwards" }}
        >
          Uncover the Truth Behind Our Changing Earth
        </h1>
      </section>
      {EnvironmentCrises.map((crisis) => (
        <section
          key={crisis.id}
          className={`flex gap-20 items-center justify-center py-20 bg-white ${
            crisis.id % 2 === 0 ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <div
            className="bg-cover bg-center size-[400px] rounded-full shadow-lg"
            style={{ backgroundImage: `url(${crisis.bgImage})` }}
          ></div>
          <div className="flex flex-col gap-3 w-[480px]">
            <h1 className="text-6xl font-semibold border-b border-black pb-3">
              {crisis.topic}
            </h1>
            <div className="text-xl">
              {Object.values(crisis.detail).map(
                (detail: string, index: number) => (
                  <h2 key={`${crisis.id}-${index}`}>{detail}</h2>
                )
              )}
            </div>
            <Link to={crisis.link}>
              <Button
                cta="Explore"
                className="py-3 rounded-3xl w-[180px] flex flex-row items-center justify-center gap-3 mt-3 text-2xl"
                level="primary"
              >
                <ArrowForward />
              </Button>
            </Link>
          </div>
        </section>
      ))}
      <section className="flex justify-center items-center bg-gradient-to-b from-[#edfef0] to-[#d9eddf]">
        <div className="flex flex-col gap-6 justify-center items-center rounded-3xl p-20">
          <img src={Congrats} alt="congrats" className="size-52" />
          <div className="flex flex-col gap-3 text-center justify-center items-center">
            {/*Headline*/}
            <h1 className="text-6xl font-semibold max-w-3xl">
              You’ve explored the key environmental challenges!
            </h1>
            {/*Subheadline*/}
            <h2 className="text-xl font-normal">
              Up Next – Take the Earth Defender Quiz!
            </h2>
          </div>
          {/*CTA Button*/}
          <Link to="/quiz">
            <Button
              cta="Continue"
              className="py-3 rounded-3xl w-[200px] flex flex-row items-center justify-center gap-3 text-2xl"
              level="primary"
            >
              <ArrowForward />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Discover;
