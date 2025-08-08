import "./AirPollution.css";
import Sidebar from "../../components/Discover/Sidebar.tsx";
import Navigator from "../../components/Discover/Navigator.tsx";
import ExplanationBox from "../../components/Discover/ExplanationBox.tsx";
import Highlighter from "react-highlight-words";
import DropDown from "../../components/Discover/DropDown.tsx";
import CardSlider from "../../components/Discover/CardSlider.tsx";
import FossilFuels from "../../assets/fossilFuels.avif";
import Ventilation from "../../assets/ventilation.jpg";
import Wildfires from "../../assets/wildfires.webp";
import Agriculture from "../../assets/agriculture.jpg";
import Construction from "../../assets/construction.jpg";
import SlideShow from "../../components/Discover/SlideShow.tsx";
import PublicTransport from "../../assets/publicTransport.jpg";
import OpenBurning from "../../assets/openBurning.jpg";
import Chimneys from "../../assets/chimneys.jpg";
import Chemicals from "../../assets/chemicals.jpg";
import ConserveEnergy from "../../assets/conserveEnergy.webp";
import NextButton from "../../components/Discover/Next.tsx";
import {
  ScrollToTop,
  ScrollToHash,
} from "../../components/Discover/ScrollHelper.ts";

function AirPollution() {
  ScrollToTop();
  ScrollToHash();

  //Types of air pollutants
  const pollutants = [
    {
      id: 1,
      title: "💨 Particulate Matter (PM)",
      shortname: "particulate-matter",
      paragraph:
        "Particulate matter refers to tiny particles or droplets in the air, such as dust, soot, and smoke. These particles are classified by size—PM10 (larger particles) and PM2.5 (smaller, more harmful particles). Common sources include construction activities, road dust, industrial processes, and vehicle emissions.",
      textToHighlight: ["tiny particles", "droplets", "PM10", "PM2.5"],
    },
    {
      id: 2,
      title: "☀️ Ground-Level Ozone (O3): ",
      shortname: "ground-level-ozone",
      paragraph:
        "Ground-level ozone is a gas formed when pollutants like nitrogen oxides and volatile organic compounds react in sunlight. It is a major component of smog and can harm respiratory health.",
      textToHighlight: [
        "pollutants",
        "gas",
        "react",
        "sunlight",
        "smog",
        "respiratory health",
      ],
    },
    {
      id: 3,
      title: "🔥 Carbon Monoxide (CO)",
      shortname: "carbon-monoxide",
      paragraph:
        "Carbon monoxide (CO) is a colorless, odorless gas produced by the incomplete combustion of fuels. Common sources include vehicle emissions, industrial processes, and heating systems.",
      textToHighlight: [
        "colorless",
        "odorless gas",
        "incomplete combustion",
        "fuels",
      ],
    },
    {
      id: 4,
      title: "🏭 Sulfur dioxide (SO₂)",
      shortname: "sulfur-dioxide",
      paragraph:
        "Sulfur dioxide (SO₂) is a gas produced by burning fuels that contain sulfur, such as coal and oil. Major sources include power plants and industrial facilities.",
      textToHighlight: [
        "gas",
        "fuels",
        "sulfur",
        "coal",
        "oil",
        "power plants",
      ],
    },
    {
      id: 5,
      title: "🚗 Nitrogen oxides (NOₓ)",
      shortname: "nitrogen-oxides",
      paragraph:
        "Nitrogen oxides (NOₓ) are a group of gases including nitric oxide (NO) and nitrogen dioxide (NO₂). They are produced mainly by burning fuels, especially in vehicles and power plants.",
      textToHighlight: [
        "nitric oxide",
        "nitrogen dioxide",
        "sulfur",
        "fuels",
        "vehicles",
        "power plants",
      ],
    },
  ];

  //Causes of air pollution
  const causes = [
    {
      id: 1,
      topic: "Burning of fossil fuels",
      title: "🔥 Burning of fossil fuels",
      bgUrl: FossilFuels,
      shortname: "burning",
      paragraph:
        "Burning fossil fuels like coal, oil, and gasoline releases harmful pollutants such as carbon monoxide, nitrogen oxides, sulfur dioxide, and particulate matter into the air. These emissions contribute to smog formation, acid rain, and serious health issues like heart and respiratory diseases. ",
      textToHighlight: [
        "harmful pollutants",
        "smog",
        "acid rain",
        "health issues",
      ],
    },
    {
      id: 2,
      title: "🏠 Indoor air pollution",
      topic: "Indoor air pollution",
      shortname: "indoor",
      bgUrl: Ventilation,
      paragraph:
        "Use of toxic products like VOCs, poor ventilation, smoking indoors, untreated mold, and the use of wood stoves or space heaters cause indoor air pollution. These sources increase harmful particles and humidity levels in enclosed spaces, contributing to poor air quality.",
      textToHighlight: [
        "toxic",
        "VOCs",
        "poor ventilation",
        "smoking",
        "untreated mold",
        "harmful particles",
        "humidity",
        "enclosed spaces",
        "poor air quality",
      ],
    },
    {
      id: 3,
      title: "🌳 Wildfires",
      topic: "Wildfires",
      shortname: "wildfires",
      bgUrl: Wildfires,
      paragraph:
        "Wildfires, worsened by climate change and farm burning, release fine particles (PM2.5) that mix with pollutants to form smog. Most wildfires are human-caused, and rising temperatures make them more frequent and intense, harming forests and wildlife.",
      textToHighlight: [
        "climate change",
        "farm burning",
        "smog",
        "human-caused",
        "more frequent",
        "intense",
      ],
    },
    {
      id: 4,
      title: "🐄 Agricultural activities",
      topic: "Agricultural activities",
      shortname: "agriculture",
      bgUrl: Agriculture,
      paragraph:
        "Pesticides and fertilizers release harmful chemicals into the air. Farmers also burn waste from crops, which creates smoke and dust. According to the FAO, “About 40% of world emissions come from livestock, 16% from mineral fertilizers, 17% from burning biomass, and 8% come from agricultural wastes.",
      textToHighlight: ["pesticides", "fertilizers", "burn", "smoke", "dust"],
    },
    {
      id: 5,
      title: "👷🏼‍♂️ Construction and demolition",
      topic: "Construction and demolition",
      shortname: "construction-and-demolition",
      bgUrl: Construction,
      paragraph:
        "Construction and demolition generate harmful pollutants like PM and VOCs, worsening air quality and causing health issues such as breathing problems and irritation. Workers and nearby residents are particularly at risk, requiring strict air quality monitoring and controls.",
      textToHighlight: [
        "pollutants",
        "PM",
        "VOCs",
        "air quality",
        "health issues",
      ],
    },
  ];

  //Habits to reduce plastic waste
  const solutions = [
    {
      id: 1,
      topic: "Using public transports",
      title: "🚇 Using public transports",
      bgImage: PublicTransport,
      shortname: "public-transports",
      descriptions: [
        "✅ Lowers emissions",
        "✅ Reduces traffic congestion",
        "✅ Cost-effective & Eco-friendly",
      ],
    },
    {
      id: 2,
      topic: "Reduction of forest fires and smoking",
      title: "🔥 Reduction of forest fires and smoking",
      bgImage: OpenBurning,
      shortname: "forest-fires-and-smoking",
      descriptions: [
        "✅ Avoid burning dry leaves or garbage, especially in dry seasons",
        "✅ Cigarette smoke regulation",
        "✅ Promote safe waste disposal",
      ],
    },
    {
      id: 3,
      topic: "Use filters for chimneys",
      title: "🏭 Use filters for chimneys",
      bgImage: Chimneys,
      shortname: "filters",
      descriptions: [
        "✅ Filters trap harmful pollutants from fireplace and industrial emissions",
        "✅ Filters minimize the emission of toxic gases and particulate matter",
        "✅ Enforcing filter use in industries",
      ],
    },
    {
      id: 4,
      topic: "Avoid using of products with chemicals",
      title: "🧪 Avoid using of products with chemicals",
      bgImage: Chemicals,
      shortname: "chemicals",
      descriptions: [
        "✅ Reduce use of paints, perfumes, and cleaners with high VOC content",
        "✅ Opt for organic or low-chemical products",
        "✅ Use harsh chemical products outdoors or in well-ventilated areas",
      ],
    },
    {
      id: 5,
      topic: "Conserve energy",
      title: "⚡ Conserve energy",
      bgImage: ConserveEnergy,
      shortname: "conserve-energy",
      descriptions: [
        "✅ Reduce fossil fuel dependence",
        "✅ Use energy-efficient appliances",
        "✅ Switch off lights when not in use",
      ],
    },
  ];

  return (
    <section className="flex justify-center">
      <Sidebar />
      <div className="py-12 flex flex-col gap-8 max-w-[60%] ml-[350px] h-full">
        {/*Navigator*/}
        <Navigator topic="Air Pollution" />
        <section className="flex flex-col gap-20">
          {/*Why tackle air pollution?*/}
          <ExplanationBox
            topic="Why tackle air pollution?"
            link="https://youtu.be/e6rglsLy1Ys?si=dgTuAqLd_M6wzusy"
            section="why-tackle-air-pollution"
          >
            <Highlighter
              highlightClassName="highlight"
              searchWords={[
                "Tiny invisible particles",
                "health problems",
                "1 and 2 million tonnes",
                "99%",
                "polluted air",
                "8 million premature deaths",
              ]}
              autoEscape={true}
              caseSensitive={false}
              textToHighlight="Air pollution is a growing global issue that affects everyone. Tiny invisible particles in the air can enter our lungs, heart, blood, and even brain, causing serious health problems. Major sources include vehicle fumes, fossil fuel burning, and crop fires. Today, 99% of the world's population breathes polluted air, leading to around 8 million premature deaths every year."
            />
          </ExplanationBox>
          {/*Types of air pollutants*/}
          <DropDown
            topic="Types of air pollutants"
            section="types-of-air-pollutants"
            info={pollutants}
            link="https://youtu.be/TXSK7Qvmlps?si=2gdE_668GT0qe8TS"
          />
          {/*Causes of air pollution*/}
          <CardSlider
            topic="Causes of air pollution"
            section="causes-of-air-pollution"
            display="paragraph"
            info={causes}
          />
          {/*Ways to reduce air pollution*/}
          <SlideShow
            topic="Ways to reduce air pollution"
            info={solutions}
            section="ways-to-reduce-air-pollution"
          />
          {/*Air Quality Index (AQI)*/}
          <section className="flex flex-col gap-5" id="air-quality-index-aqi">
            <h2 className="text-5xl font-semibold">Air Quality Index (AQI)</h2>
            <iframe
              src="https://aqicn.org/map/asia/"
              width="100%"
              height="500"
            ></iframe>
          </section>
          {/*Next Button*/}
          <NextButton page="Quiz" link="/quiz" />
        </section>
      </div>
    </section>
  );
}

export default AirPollution;
