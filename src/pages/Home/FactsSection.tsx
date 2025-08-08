import "./FactsSection.css";
import { useState, useEffect } from "react";
import Deforestation from "../../assets/forest.png";
import WaterPollution from "../../assets/waterPollution.png";
import ClimateChange from "../../assets/climateChange.png";
import CarbonEmission from "../../assets/carbonEmission.png";
import TreeCutting from "../../assets/treeCutting.jpeg";
import TransportationEmission from "../../assets/transportationEmission.jpeg";
import ClimateDisplacement from "../../assets/climateDisplacement.jpeg";
import OceanPollution from "../../assets/oceanPollution.jpg";
import ArrowForward from "../../assets/arrowForward.tsx";
import { Link } from "react-router-dom";
import Button from "../../components/Button.tsx";

function FactsSection() {
  //Show cards alternately
  const cardItems = [
    {
      id: 1,
      topic: "Carbon Emission",
      messageFront: "Transportation accounts for nearly",
      span: "25%",
      messageBack: "of global carbon emissions.",
      spanFontColor: "#f87171",
      bgImage: TransportationEmission,
      png: CarbonEmission,
    },
    {
      id: 2,
      topic: "Climate Displacement",
      messageFront: "By 2050,",
      span: "200M people",
      messageBack: "could be displaced by climate change.",
      spanFontColor: "#facc15",
      bgImage: ClimateDisplacement,
      png: ClimateChange,
    },
    {
      id: 3,
      topic: "Ocean Pollution",
      messageFront: "Every minute,",
      span: "1 garbage truck",
      messageBack: "of plastic enters our oceans.",
      spanFontColor: "#60a5fa",
      bgImage: OceanPollution,
      png: WaterPollution,
    },
    {
      id: 4,
      topic: "Deforestation",
      messageFront: "Forests are shrinking by",
      span: "18.7M acres",
      messageBack: "annually.",
      spanFontColor: "#4ade80",
      bgImage: TreeCutting,
      png: Deforestation,
    },
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); //Start fade out effect

      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % cardItems.length);
        setFade(true); //Start fade in effect
      }, 500); // Delay content change to sync with fade-out
    }, 10000); // Change content every 10 seconds

    return () => clearInterval(interval);
  });

  return (
    <section className="flex justify-center items-center bg-white">
      <div className="mx-auto flex flex-row-reverse gap-20 justify-center items-center p-20">
        <div className="flex flex-col gap-6 justify-center">
          <div className="flex flex-col gap-3">
            {/*Headline*/}
            <h1 className="text-6xl font-semibold max-w-lg">
              Why It’s Urgent to Save Our Earth
            </h1>
            {/*Subheadline*/}
            <h2 className="text-xl font-normal leading-snug">
              <p>Small actions today can lead to a sustainable tomorrow.</p>{" "}
              <p>Discover the facts driving the need for change:</p>
            </h2>
          </div>
          {/*CTA Button*/}
          <Link to="/discover">
            <Button
              cta="Learn More"
              className="py-3 rounded-3xl w-[220px] flex flex-row items-center justify-center gap-3 text-2xl"
              level="primary"
            >
              <ArrowForward />
            </Button>
          </Link>
        </div>
        {/*Cards*/}
        <div className="group">
          <div
            className={`rounded-3xl shadow-lg size-72 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-all ease-in-out duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="bg-center bg-cover absolute inset-0 rounded-3xl"
              style={{
                backgroundImage: `url(${cardItems[index].bgImage})`,
              }}
            ></div>
            <div className="rounded-3xl shadow-lg size-72 flex flex-col items-center justify-center gap-3 text-center p-12 absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] bg-black/50 text-white/95">
              <img src={cardItems[index].png} alt="" className="size-[60px]" />
              <h2 className="text-xl font-bold">{cardItems[index].topic}</h2>
              <p className="">
                {cardItems[index].messageFront}{" "}
                <span
                  className="font-bold"
                  style={{ color: cardItems[index].spanFontColor }}
                >
                  {cardItems[index].span}
                </span>{" "}
                {cardItems[index].messageBack}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FactsSection;
