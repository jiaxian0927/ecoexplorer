import "./HeroSection.css";
import Recycle from "../../assets/recycle.png";
import Plastic from "../../assets/plastic.jpeg";
import Tree from "../../assets/tree.webp";
import Energy from "../../assets/energy.jpg";
import Transport from "../../assets/transport.jpg";

function HeroSection() {
  return (
    <section className="flex items-center justify-center bg-gradient-to-b from-[#edfef0] to-[#d9eddf] h-[calc(100vh-120px)]">
      <div className="text-center flex flex-col gap-[40px] p-10">
        {/*Headline*/}
        <h1 className="text-8xl font-medium tracking-tight">
          Take Action Today
        </h1>
        <div className="flex justify-center">
          {/*Animated Cards*/}
          <div className="relative z-0">
            <img
              src={Transport}
              alt="public-transport"
              className="w-60 h-60 object-cover rounded-3xl shadow-lg"
              style={
                {
                  animation: "cardAnimation 2s forwards",
                  // @ts-ignore
                  "--translate-distance": "-380px",
                  "--rotate-degree": "-1deg",
                } as React.CSSProperties & Record<string, string>
              }
            />
            <img
              src={Energy}
              alt="clean-energy"
              className="w-60 h-60 object-cover rounded-3xl absolute inset-0 z-10 shadow-lg"
              style={
                {
                  animation: "cardAnimation 2s forwards",
                  // @ts-ignore
                  "--translate-distance": "-180px",
                  "--rotate-degree": "-2deg",
                } as React.CSSProperties & Record<string, string>
              }
            />
            <img
              src={Plastic}
              alt="plastic"
              className="w-60 h-60 object-cover rounded-3xl absolute inset-0 z-20 shadow-lg"
              style={
                {
                  animation: "cardAnimation 2s forwards",
                  // @ts-ignore
                  "--translate-distance": "1px",
                  "--rotate-degree": "0deg",
                } as React.CSSProperties & Record<string, string>
              }
            />
            <img
              src={Recycle}
              alt="recycle"
              className="w-60 h-60 object-cover rounded-3xl absolute inset-0 z-30 shadow-lg"
              style={
                {
                  animation: "cardAnimation 2s forwards",
                  // @ts-ignore
                  "--translate-distance": "180px",
                  "--rotate-degree": "3deg",
                } as React.CSSProperties & Record<string, string>
              }
            />
            <img
              src={Tree}
              alt="tree"
              className="w-60 h-60 object-cover rounded-3xl absolute inset-0 z-40 shadow-lg"
              style={
                {
                  animation: "cardAnimation 2s forwards",
                  // @ts-ignore
                  "--translate-distance": "380px",
                  "--rotate-degree": "2deg",
                } as React.CSSProperties & Record<string, string>
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-[2vh]">
          {/*Subheadline*/}
          <div className="text-xl leading-snug">
            <h2>
              Simple steps can create a sustainable future. Reduce, reuse,
              recycle, plant trees, and conserve energy.
            </h2>
            <h2>Together, we can save Earth for generations to come.</h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
