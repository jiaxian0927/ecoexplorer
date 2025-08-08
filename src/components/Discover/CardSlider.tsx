import Highlighter from "react-highlight-words";
import AddIcon from "../../assets/addIcon.tsx";
import ArrowForward from "../../assets/arrowForward.tsx";
import ArrowBackward from "../../assets/arrowBackward.tsx";
import UseArrayNavigation from "./Array.tsx";
import { useState } from "react";

interface BaseCardInfo {
  id: number;
  topic: string;
  title: string;
  bgUrl: string;
  shortname: string;
}

interface ParagraphCardInfo extends BaseCardInfo {
  textToHighlight: string[];
  paragraph: string;
  bullets?: never;
}

interface BulletCardInfo extends BaseCardInfo {
  bullets: string[];
  paragraph?: never;
  textToHighlight?: never;
}

type CardInfo = ParagraphCardInfo | BulletCardInfo;

interface CardSliderProps {
  topic: string;
  display: "paragraph" | "bullet";
  info: CardInfo[];
  section?: string;
}

const CardSlider = ({ topic, display, info, section }: CardSliderProps) => {
  const isParagraphCard = (card: CardInfo): card is ParagraphCardInfo => {
    return display === "paragraph" && "paragraph" && "textToHighlight" in card; // Check if the card has a paragraph
  };

  const isBulletCard = (card: CardInfo): card is BulletCardInfo => {
    return display === "bullet" && "bullets" in card; // Check if the card has bullets
  };

  //Left & Right buttons
  const cardSliderNavigation = UseArrayNavigation(0, 400, info, "unable", 20);

  //Show causes
  const [showInformation, setShowInformation] = useState<
    Record<string, boolean>
  >(() => {
    const initialState: Record<string, boolean> = {};
    info.forEach((item) => {
      initialState[item.shortname] = false;
    });
    return initialState;
  });

  return (
    <section className="flex flex-col gap-8" id={section}>
      <h2 className="text-5xl font-semibold">{topic}</h2>
      {/*Scrollable cards*/}
      <div className="flex flex-row gap-5 w-full overflow-hidden">
        {/*Details*/}
        {info.map((info) => (
          <div
            className="rounded-xl p-5 min-w-[400px] h-[350px] bg-cover bg-center flex flex-col-reverse relative"
            style={{
              transform: `translateX(-${cardSliderNavigation.totalShift}px)`, // Apply the total shift
              transition: "transform 0.4s ease-in-out",
              backgroundImage: `url(${info.bgUrl})`,
            }}
            key={info.id}
          >
            <h1 className="font-semibold text-3xl mb-2 text-[#F5F5F5] pr-8 text-balance">
              {info.topic}
            </h1>
            <div
              className={`flex flex-col gap-5 absolute transition-all duration-300 bg-[#2F2F2F] inset-0 rounded-xl p-5 ${
                showInformation[info.shortname] === true
                  ? "translate-y-[0px]"
                  : "translate-y-[350px]"
              }`}
            >
              <h3 className="text-md font-medium text-white">{info.title}</h3>
              {/* Content based on display mode */}
              {isParagraphCard(info) ? (
                <article className="text-lg font-medium text-white">
                  <Highlighter
                    highlightClassName="highlightDark"
                    searchWords={info.textToHighlight}
                    autoEscape={true}
                    caseSensitive={false}
                    textToHighlight={info.paragraph}
                  />
                </article>
              ) : isBulletCard(info) ? (
                <div>
                  {info.bullets.map((bullet, index) => (
                    <p key={index} className="text-white font-medium">
                      ✅ {bullet}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="absolute bottom-5 right-5">
              <button
                className="rounded-full bg-[#1C1C1E] hover:bg-[#1C1C1E]/40 transition-all duration-300 p-[2px]"
                onClick={() =>
                  setShowInformation((prev) => ({
                    [info.shortname]: !prev[info.shortname],
                  }))
                }
              >
                <AddIcon
                  className={`size-[30px] fill-gray-100 transition-all duration-300 ${
                    showInformation[info.shortname] === true
                      ? "rotate-45"
                      : "rotate-0"
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row-reverse gap-3 mt-3">
        <button
          className={`p-2 rounded-full bg-gray-100 ${
            cardSliderNavigation.currentIndex === info.length - 1
              ? "cursor-default"
              : "cursor-pointer hover:bg-gray-300 transition-all"
          }`}
          onClick={cardSliderNavigation.goForward}
        >
          <ArrowForward
            className={`size-[24px] ${
              cardSliderNavigation.currentIndex === info.length - 1
                ? "fill-gray-300"
                : "flil-[#000000]"
            }`}
          />
        </button>
        <button
          className={`p-2 rounded-full bg-gray-100 ${
            cardSliderNavigation.currentIndex === 0
              ? "cursor-default"
              : "cursor-pointer hover:bg-gray-300 transition-all"
          }`}
          onClick={cardSliderNavigation.goBackward}
        >
          <ArrowBackward
            className={`size-[24px] ${
              cardSliderNavigation.currentIndex === 0
                ? "fill-gray-300"
                : "flil-[#000000]"
            }`}
          />
        </button>
      </div>
    </section>
  );
};

export default CardSlider;
