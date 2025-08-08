import "./Deforestation.css";
import Sidebar from "../../components/Discover/Sidebar";
import Navigator from "../../components/Discover/Navigator";
import ExplanationBox from "../../components/Discover/ExplanationBox";
import Highlighter from "react-highlight-words";
import DropDown from "../../components/Discover/DropDown";
import CardSlider from "../../components/Discover/CardSlider";
import PalmOil from "../../assets/palmOil.jpeg";
import Paper from "../../assets/paper.png";
import Farm from "../../assets/Farm.jpg";
import FSC from "../../assets/FSC.webp";
import plantTrees from "../../assets/plantTrees.webp";
import SlideShow from "../../components/Discover/SlideShow";
import Vichada from "../../assets/Vichada.jpg";
import Bauminvest from "../../assets/Bauminvest.jpg";
import India from "../../assets/india.webp";
import Nicaragua from "../../assets/Nicaragua.jpg";
import China from "../../assets/china.jpg";
import NextButton from "../../components/Discover/Next";
import {
  ScrollToTop,
  ScrollToHash,
} from "../../components/Discover/ScrollHelper.ts";

function Deforestation() {
  ScrollToTop();
  ScrollToHash();

  //Impacts of deforestation
  const impacts = [
    {
      id: 1,
      title: "🥵 Climate Change",
      shortname: "climate-change",
      paragraph:
        "Deforestation releases large amounts of carbon dioxide (CO2) into the atmosphere, exacerbating the greenhouse effect and contributing to global warming. This leads to more extreme weather events, such as heatwaves, droughts, and heavy rainfall. The loss of trees also reduces the planet's ability to absorb CO2, further intensifying climate change.",
      textToHighlight: [
        "carbon dioxide",
        "greenhouse effect",
        "global warming",
      ],
    },
    {
      id: 2,
      title: "🦏 Biodiversity Loss",
      shortname: "biodiversity-loss",
      paragraph:
        "The destruction of forests leads to the loss of habitats for countless species, potentially causing extinctions and disrupting ecosystems. This loss of biodiversity can have cascading effects on food webs and ecosystem services, such as pollination and pest control. The extinction of species can also diminish genetic diversity, making ecosystems less resilient to environmental changes.",
      textToHighlight: [
        "habitats",
        "species",
        "extinctions",
        "ecosystems",
        "food webs",
        "genetic diversity",
        "less resilient",
      ],
    },
    {
      id: 3,
      title: "🌱 Soil Erosion",
      shortname: "soil-erosion",
      paragraph:
        "When trees are removed, soil becomes more susceptible to erosion by wind and water, leading to soil degradation and reduced agricultural productivity. Erosion can also result in sedimentation in rivers and streams, harming aquatic ecosystems and water quality. The loss of tree roots, which help anchor soil in place, exacerbates this problem.",
      textToHighlight: [
        "susceptible",
        "soil degradation",
        "agricultural productivity",
        "sedimentation",
        "aquatic ecosystems",
      ],
    },
    {
      id: 4,
      title: "🌧️ Water Cycle Disruption",
      shortname: "water-cycle-disruption",
      paragraph:
        "Forests play a vital role in regulating water cycles. Deforestation can alter rainfall patterns, reduce water availability, and increase the risk of floods and droughts. The loss of trees disrupts the natural process of transpiration, where trees release water vapor into the atmosphere, contributing to cloud formation and precipitation. This can lead to changes in local and regional climates.",
      textToHighlight: [
        "water cycles",
        "rainfall patterns",
        "transpiration",
        "cloud formation",
        "precipitation",
      ],
    },
    {
      id: 5,
      title: "💨 Air Pollution",
      shortname: "air-pollution",
      paragraph:
        "Deforestation can release pollutants into the air, contributing to air quality problems and affecting human health. The burning of trees during deforestation releases particulate matter and other harmful substances, which can lead to respiratory issues and other health problems. Additionally, the loss of trees reduces the natural filtration of air pollutants, further degrading air quality.",
      textToHighlight: [
        "pollutants",
        "human health",
        "air quality",
        "natural filtration",
      ],
    },
  ];

  //Ways to save trees
  const causes = [
    {
      id: 1,
      topic: "Avoid products made with palm oil",
      title: "🌴 Avoid products made with palm oil",
      bgUrl: PalmOil,
      shortname: "palm-oil",
      bullets: [
        "Check labels & avoid palm oil",
        "Buy RSPO-certified products",
        "Support eco-regulated brands",
      ],
    },
    {
      id: 2,
      topic: "Use less paper",
      title: "📄 Use less paper",
      bgUrl: Paper,
      shortname: "paper",
      bullets: [
        "Go paperless",
        "Buy recycled paper products",
        "Use both sides of paper",
        "Buy secondhand or digital books",
        "Choose reclaimed wood",
      ],
    },
    {
      id: 3,
      topic: "Eat less meat",
      title: "🥩 Eat less meat",
      bgUrl: Farm,
      shortname: "farm",
      bullets: [
        "Support local, pasture-raised meat",
        "Reduce dairy consumption",
        "Try plant-based alternatives",
      ],
    },
    {
      id: 4,
      topic: "Buy FSC-certified wood",
      title: "🪵 Buy FSC-certified wood",
      bgUrl: FSC,
      shortname: "FSC",
      bullets: [
        "Avoid uncertified lumber and furniture",
        "Support eco-conscious brands",
      ],
    },
    {
      id: 5,
      topic: "Plant trees",
      title: "🪴 Plant trees",
      bgUrl: plantTrees,
      shortname: "plant",
      bullets: [
        "Plant a tree at home",
        "Donate to trusted organizations",
        "Support local tree-planting initiatives",
        "Advocate for urban greening projects",
      ],
    },
  ];

  //Success stories of reforestation projects
  const successStories = [
    {
      id: 1,
      topic: "Vichada Climate Reforestation Project (Colombia)",
      title: "Vichada Climate Reforestation Project (Colombia)",
      bgImage: Vichada,
      shortname: "colombia",
      descriptions: [
        "🌍 Location: Orinoco Department, Colombia",
        "🌱 Certification: Gold Standard (ID: 4221)",
        "📅 Duration: 2006–2035",
      ],
    },
    {
      id: 2,
      topic: "BaumInvest Reforestation Project (Costa Rica)",
      title: "BaumInvest Reforestation Project (Costa Rica)",
      bgImage: Bauminvest,
      shortname: "costa-rica",
      descriptions: [
        "🌍 Location: Northern Costa Rica",
        "🌱 Certification: Gold Standard (ID: 2913)",
        "📅 Duration: 2007–2035",
      ],
    },
    {
      id: 3,
      topic: "Bagepalli CDM Reforestation Programme (India)",
      title: "Bagepalli CDM Reforestation Programme (India)",
      bgImage: India,
      shortname: "india",
      descriptions: [
        "🌍 Location: Chikkaballapur District, Karnataka (5 taluks)",
        "🌱 Certification: Gold Standard (ID: 4240)",
        "📅 Duration: 2013–2023",
      ],
    },
    {
      id: 4,
      topic: "Reforestation Program in Southeastern Nicaragua",
      title: "Reforestation Program in Southeastern Nicaragua",
      bgImage: Nicaragua,
      shortname: "nicaragua",
      descriptions: [
        "🌍 Location: Degraded pasturelands, Nicaragua",
        "🌱 Certification: Gold Standard (ID: 4220)",
        "📅 Duration: 2008–2037",
      ],
    },
    {
      id: 5,
      topic: "Liangdu Afforestation Project (China)",
      title: "Liangdu Afforestation Project (China)",
      bgImage: China,
      shortname: "china",
      descriptions: [
        "🌍 Location: Liupanshui City, Guizhou Province",
        "🌱 Certification: Verra-Certified (ID: 2083)",
        "📅 Duration: 29 Year",
      ],
    },
  ];

  return (
    <section className="flex justify-center">
      <Sidebar />
      <div className="py-12 flex flex-col gap-8 max-w-[60%] ml-[350px] h-full">
        {/*Navigator*/}
        <Navigator topic="Deforestation" />
        <section className="flex flex-col gap-20">
          {/*Why trees are important?*/}
          <ExplanationBox
            topic="Why trees are important?"
            link="https://youtu.be/UnwMq1gGjhk?si=cAV3WhADKbiX5af8"
            section="why-trees-are-important"
          >
            <Highlighter
              highlightClassName="highlight"
              searchWords={[
                "clean water",
                "fresh air",
                "shade",
                "food",
                "biodiversity",
                "habitats",
                "resources",
              ]}
              autoEscape={true}
              caseSensitive={false}
              textToHighlight="Trees play a vital role in sustaining life on Earth. They provide us with clean water, fresh air, and shade, while also supplying food for humans, animals, and other plants. Trees support biodiversity by offering habitats for countless species of flora and fauna. Additionally, they serve as essential resources for firewood, building materials, and energy. Beyond their practical uses, trees hold cultural, spiritual, and recreational significance, enriching our lives in countless ways."
            />
          </ExplanationBox>
          {/*Impacts of deforestation*/}
          <DropDown
            topic="Impacts of Deforestation"
            section="impacts-of-deforestation"
            info={impacts}
            link="https://youtu.be/PJdz4gCG6pA?si=nGl8mcamcBlv3EDE"
          />
          {/*Ways to save trees*/}
          <CardSlider
            topic="Ways to save trees"
            section="ways-to-save-trees"
            display="bullet"
            info={causes}
          />
          {/*Success stories of reforestation projects*/}
          <SlideShow
            topic="Success stories of reforestation projects"
            info={successStories}
            section="success-stories-of-reforestation"
          />
          {/*Global Forest Timeline*/}
          <section className="flex flex-col gap-5" id="global-forest-timeline">
            <h2 className="text-5xl font-semibold">Global Forest Timeline</h2>
            <iframe
              width="100%"
              height="650"
              src="https://www.globalforestwatch.org/embed/widget/treeLossPct/global"
            ></iframe>
          </section>
          {/*Next Button*/}
          <NextButton page="Ocean Pollution" link="/ocean-pollution" />
        </section>
      </div>
    </section>
  );
}

export default Deforestation;
