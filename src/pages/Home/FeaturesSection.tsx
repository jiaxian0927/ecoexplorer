import "./FeaturesSection.css";
import ArrowForward from "../../assets/arrowForward.tsx";
import Button from "../../components/Button.tsx";
import { Link } from "react-router-dom";

function FeaturesSection() {
  return (
    <section className="flex justify-center items-center bg-white">
      <div className="flex flex-row-reverse items-center justify-center py-20 gap-24">
        <div className="flex flex-col gap-6 justify-center">
          <div className="flex flex-col gap-5">
            {/*Headline*/}
            <h1 className="text-6xl font-semibold max-w-[450px] text-balance">
              Scan. Detect. Dispose.
            </h1>
            {/*Subheadlines*/}
            <div className="text-xl font-normal leading-snug text-balance">
              <h2>Not sure how to throw it away?</h2>
              <h2>Scan it. We'll guide you the right way.</h2>
            </div>
          </div>
          {/*CTA Button*/}
          <Link to="/features">
            <Button
              cta="Scan Now"
              className="py-3 rounded-3xl w-[220px] flex flex-row items-center justify-center gap-3 text-2xl"
              level="primary"
            >
              <ArrowForward />
            </Button>
          </Link>
        </div>
        <iframe
          src="https://lottie.host/embed/d630f141-70a8-4aa0-a641-264b637d8bd1/8hEns6zT8Q.lottie"
          height={500}
          width={500}
        ></iframe>
      </div>
    </section>
  );
}

export default FeaturesSection;
