import ArrowBackward from "../../assets/arrowBackward";
import ArrowForward from "../../assets/arrowForward";
import AddIcon from "../../assets/addIcon";
import UseArrayNavigation from "./Array";
import { useState, useRef, useEffect } from "react";

interface SlideShowProps {
  topic: string;
  info: {
    id: number;
    topic: string;
    title: string;
    bgImage: string;
    shortname: string;
    descriptions: string[];
  }[];
  section?: string;
}

const SlideShow = ({ topic, info, section }: SlideShowProps) => {
  //Get the div's width
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const updateWidth = () => {
        const rect = containerRef.current?.getBoundingClientRect();
        setWidth((rect?.width ?? 0) * 0.8);
      };
      updateWidth(); // Set width
      window.addEventListener("resize", updateWidth); // Update width on resize
      return () => window.removeEventListener("resize", updateWidth); // Cleanup
    }
  }, []);

  const SlideShowNavigation = UseArrayNavigation(
    0,
    width || 0,
    info,
    "able",
    12
  );

  //Show information
  const [showDetail, setShowDetail] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    info.forEach((item) => (initialState[item.shortname] = false));
    return initialState;
  });

  const [isAnimatingTranslate, setIsAnimatingTranslate] = useState(false);
  const [translateX, setTranslateX] = useState(0);

  const handleAnimation = (direction: "forward" | "backward") => {
    if (isAnimatingTranslate) return;

    setIsAnimatingTranslate(true);
    // Set initial translateX based on direction
    setTranslateX(
      direction === "forward"
        ? -SlideShowNavigation.totalShift
        : SlideShowNavigation.totalShift
    );

    // Close all details
    setShowDetail(
      Object.fromEntries(Object.keys(showDetail).map((key) => [key, false]))
    );

    setTimeout(() => {
      // Execute navigation after animation starts
      direction === "forward"
        ? SlideShowNavigation.goForward()
        : SlideShowNavigation.goBackward();

      // Reset position after navigation update
      setTranslateX(0);
      setIsAnimatingTranslate(false);
    }, 500);
  };

  const handleGoForward = () => handleAnimation("forward");
  const handleGoBackward = () => handleAnimation("backward");

  return (
    <section className="flex flex-col gap-8" id={section}>
      <h2 className="text-5xl font-semibold">{topic}</h2>
      <div
        className="flex flex-row gap-3 overflow-hidden w-full justify-center"
        ref={containerRef}
      >
        {SlideShowNavigation.displayIndexs.map((index) => (
          <div
            key={info[index].id}
            className={`rounded-xl p-5 min-w-[80%] h-[400px] bg-cover bg-center flex flex-col-reverse relative bg-black/30 bg-blend-darken ${
              SlideShowNavigation.currentIndex === index
                ? "opacity-100"
                : "opacity-60"
            } `}
            style={{
              backgroundImage: `url(${info[index].bgImage})`,
              transform: `translateX(${translateX}px)`,
              transition: `${
                isAnimatingTranslate === true
                  ? "transform 0.50s ease-in-out"
                  : "opacity 0.50s ease-in-out"
              }`,
            }}
          >
            <h1 className="font-semibold text-4xl mb-2 text-[#F5F5F5] max-w-[80%] text-balance">
              {info[index].topic}
            </h1>
            <div
              className={`flex flex-col gap-5 absolute transition-all duration-500 bg-[#2F2F2F] inset-0 rounded-xl p-5 ${
                showDetail[info[index].shortname] === true
                  ? "translate-y-[0px]"
                  : "translate-y-[400px]"
              }`}
            >
              <h3 className="text-md font-medium text-white">
                {info[index].title}
              </h3>
              <div>
                {info[index].descriptions.map((description, index) => (
                  <article key={`${info[index]}-${index}`}>
                    <p className={`text-lg font-medium text-white`}>
                      {description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <div className="absolute bottom-5 right-5">
              <button
                className="rounded-full bg-gray-100 hover:bg-gray-100/40 transition-all duration-300 p-[2px]"
                onClick={() =>
                  setShowDetail((prev) => ({
                    ...prev,
                    [info[index].shortname]: !prev[info[index].shortname],
                  }))
                }
              >
                <AddIcon
                  className={`fill-[#1C1C1E] size-[30px] transition-all duration-300 ${
                    showDetail[info[index].shortname] === true
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
          className="p-2 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-300 transition-all"
          onClick={handleGoForward}
          disabled={isAnimatingTranslate}
        >
          <ArrowForward className="size-[24px] fill-[#000000]" />
        </button>
        <button
          className="p-2 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-300 transition-all"
          onClick={handleGoBackward}
          disabled={isAnimatingTranslate}
        >
          <ArrowBackward className="size-[24px] fill-[#000000]" />
        </button>
      </div>
    </section>
  );
};

export default SlideShow;
