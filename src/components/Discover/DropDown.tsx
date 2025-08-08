import Highlighter from "react-highlight-words";
import ArrowUp from "../../assets/arrowUp";
import ArrowDown from "../../assets/arrowDown";
import { useState } from "react";

interface DropDownProps {
  topic: string;
  info: {
    id: number;
    title: string;
    shortname: string;
    paragraph: string;
    textToHighlight: string[];
  }[];
  link: string;
  section?: string;
}

const DropDown = ({ topic, info, link, section }: DropDownProps) => {
  //Arrow Down & Up
  // Initialize state for dropdown toggles
  const [drop, setDrop] = useState<Record<string, boolean>>(() => {
    // Initialize all dropdowns as closed (false)
    const initialState: Record<string, boolean> = {};
    info.forEach((item) => {
      initialState[item.shortname] = false;
    });
    return initialState;
  });

  return (
    <section className="flex flex-col gap-8" id={section}>
      <h2 className="text-5xl font-semibold">{topic}</h2>
      <div className="flex flex-col gap-5">
        {info.map((info) => (
          <div
            className="shadow-md p-6 rounded-xl hover:scale-[1.03] transition-all"
            key={info.id}
          >
            <div
              className={`flex flex-row justify-between transition-all duration-200 items-center ${
                drop[info.shortname] === true
                  ? "border-b border-gray-300 mb-3 pb-2"
                  : "border-b-0 mb-0 pb-0"
              }`}
            >
              <h3 className="text-xl font-medium -translate-x-1 transition-all duration-200">
                {info.title}
              </h3>
              <button
                className="hover:bg-gray-200 rounded-xl transition-none"
                onClick={() =>
                  setDrop((prev) => ({
                    [info.shortname]: !prev[info.shortname],
                  }))
                }
              >
                {drop[info.shortname] === true ? <ArrowUp /> : <ArrowDown />}
              </button>
            </div>
            <article
              className={`text-lg font-light transition-all duration-200 text-black ${
                drop[info.shortname] === true ? "inline" : "hidden"
              }`}
            >
              <Highlighter
                highlightClassName="highlight"
                searchWords={info.textToHighlight}
                autoEscape={true}
                caseSensitive={false}
                textToHighlight={info.paragraph}
              />
            </article>
          </div>
        ))}
      </div>
      <p className="italic">
        Video link:{" "}
        <a
          href={link}
          className="hover: underline hover:text-green-600 transition-all"
        >
          {link}
        </a>
      </p>
    </section>
  );
};

export default DropDown;
