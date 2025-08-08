import "./CtaSection.css";
import Earth from "../../assets/saveEarth.png";
import Button from "../../components/Button.tsx";
import ArrowForward from "../../assets/arrowForward.tsx";
import { Link } from "react-router-dom";

function CtaSection() {
  return (
    <section className="flex justify-center items-center bg-gradient-to-b from-[#edfef0] to-[#d9eddf]">
      <div className="flex flex-col gap-6 justify-center items-center rounded-3xl p-20">
        <img src={Earth} alt="save-earth" className="size-60" />
        <div className="flex flex-col gap-3 text-center">
          {/*Headline*/}
          <h1 className="text-6xl font-semibold">Make a Difference Today!</h1>
          {/*Subheadline*/}
          <h2 className="text-xl font-normal leading-snug max-w-2xl">
            Get access to exclusive sustainability tips, events, and a network
            of changemakers. Take action now!
          </h2>
        </div>
        {/*CTA Button*/}
        <Link to="/community">
          <Button
            cta="Join EcoCommunity"
            className="px-10 py-3 rounded-3xl text-2xl flex flex-row items-center gap-2"
            level="primary"
          >
            <ArrowForward />
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default CtaSection;
