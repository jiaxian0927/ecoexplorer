import "./OceanPollution.css";
import Sidebar from "../../components/Discover/Sidebar";
import Navigator from "../../components/Discover/Navigator";
import ExplanationBox from "../../components/Discover/ExplanationBox";
import Highlighter from "react-highlight-words";
import DropDown from "../../components/Discover/DropDown";
import CardSlider from "../../components/Discover/CardSlider";
import Bamboo from "../../assets/bamboo.jpg";
import Glass from "../../assets/glass.jpg";
import StainlessSteel from "../../assets/stainlessSteel.jpeg";
import Silicone from "../../assets/silicone.jpeg";
import Bioplastics from "../../assets/bioplastics.jpg";
import SlideShow from "../../components/Discover/SlideShow";
import SingleUsePlastics from "../../assets/singleUsePlastics.webp";
import Microbead from "../../assets/microbead.webp";
import Secondhand from "../../assets/secondhand.webp";
import RecyclingPlastics from "../../assets/recyclingPlastics.jpg";
import NaturalFibres from "../../assets/naturalFibres.jpg";
import GameCanvas from "../../components/Game/GameCanvas";
import NextButton from "../../components/Discover/Next";
import {
  ScrollToTop,
  ScrollToHash,
} from "../../components/Discover/ScrollHelper.ts";

function OceanPollution() {
  ScrollToTop();
  ScrollToHash();

  //Impacts of microplastics
  const impacts = [
    {
      id: 1,
      title: "🐟 Threat to Marine Life & Ecosystems",
      shortname: "marine-life",
      paragraph:
        "Microplastics are mistakenly consumed by marine animals—from tiny plankton to large whales—leading to internal blockages, starvation, and even death. These particles also leach toxic additives (like phthalates and flame retardants) into aquatic environments, disrupting hormone systems in fish and shellfish. Additionally, microplastics accumulate up the food chain, meaning predators (including humans) ingest higher concentrations of plastic-contaminated prey, further destabilizing marine ecosystems.",
      textToHighlight: [
        "marine animals",
        "internal blockages",
        "starvation",
        "death",
        "toxic additives",
        "hormone systems",
        "food chain",
      ],
    },
    {
      id: 2,
      title: "🫁 Human Health Risks",
      shortname: "human-health",
      paragraph:
        "Studies have detected microplastics in human blood, lungs, and even placentas, raising concerns about long-term inflammation and cellular damage. Some plastic chemicals, like bisphenol A (BPA), are endocrine disruptors linked to reproductive issues, obesity, and cancers. Worse, microplastics act as carriers for pathogens and pollutants, potentially increasing antibiotic resistance or introducing new health threats when inhaled or ingested through food and water.",
      textToHighlight: [
        "human blood",
        "lungs",
        "placentas",
        "long-term inflammation",
        "cellular damage",
        "endocrine disruptors",
        "reproductive issues",
        "obesity",
        "cancers",
        "antibiotic resistance",
      ],
    },
    {
      id: 3,
      title: "🌱 Soil Contamination & Agricultural Damage",
      shortname: "soil-contamination",
      paragraph:
        "Microplastics in soil alter its structure, reducing water retention and aeration, which stunts root growth and crop yields. Earthworms and beneficial microbes—critical for nutrient cycling—are harmed by plastic toxicity, degrading soil fertility over time. Crops like wheat and lettuce have been found to absorb nanoplastics, meaning these particles could enter our food supply directly through vegetables and grains.",
      textToHighlight: [
        "soil",
        "structure",
        "water retention",
        "aeration",
        "root growth",
        "crop yields",
        "earthworms",
        "beneficial microbes",
        "nutrient cycling",
        "soil fertility",
        "food supply",
      ],
    },
    {
      id: 4,
      title: "🧪 Chemical Pollution & Toxic Accumulation",
      shortname: "chemical-pollution",
      paragraph:
        "Microplastics absorb and concentrate hazardous chemicals from their surroundings, such as pesticides, heavy metals, and industrial pollutants like PCBs. When ingested by organisms, these toxins accumulate in tissues, leading to biomagnification—where top predators (including humans) face the highest exposure. Chronic exposure to these chemical-laden plastics has been linked to liver damage, immune system suppression, and developmental disorders in wildlife and lab studies.",
      textToHighlight: [
        "surroundings",
        "toxins accumulate",
        "biomagnification",
        "Chronic exposure",
        "liver damage",
        "immune system suppression",
        "developmental disorders",
      ],
    },
  ];

  //Ways to save trees
  const causes = [
    {
      id: 1,
      topic: "Bamboo",
      title: "🎍 Bamboo",
      bgUrl: Bamboo,
      shortname: "bamboo",
      bullets: [
        "Toothbrushes",
        "Utensils",
        "Straws",
        "Serving Bowls",
        "Soap dishes",
        "Shower caddies",
      ],
    },
    {
      id: 2,
      topic: "Glass",
      title: "🫙 Glass",
      bgUrl: Glass,
      shortname: "glass",
      bullets: [
        "Food Storage Containers",
        "Beverage Bottles",
        "Coffee and Tea Makers",
        "Cosmetic Containers",
        "Spice Jars",
      ],
    },
    {
      id: 3,
      topic: "Stainless Steel",
      title: "🔪 Stainless Steel",
      bgUrl: StainlessSteel,
      shortname: "stainless-steel",
      bullets: [
        "Drinkware",
        "Food Containers",
        "Cookware",
        "Straws",
        "Utensils",
      ],
    },
    {
      id: 4,
      topic: "Silicone",
      title: "🥣 Silicone",
      bgUrl: Silicone,
      shortname: "silicone",
      bullets: [
        "Baking Mats",
        "Food Covers",
        "Cooking Utensils",
        "Ice Cube Trays",
        "Baking Molds",
      ],
    },
    {
      id: 5,
      topic: "Bioplastics",
      title: "🌱 Bioplastics",
      bgUrl: Bioplastics,
      shortname: "bioplastics",
      bullets: [
        "Compostable Bags",
        "Disposable Cutlery",
        "Packaging Materials",
        "Agricultural Film",
        "Disposable Plates and Bowls",
      ],
    },
  ];

  //Habits to reduce plastic waste
  const habits = [
    {
      id: 1,
      topic: "Wean yourself off single-use plastics",
      title: "🛍️ Wean yourself off single-use plastics",
      bgImage: SingleUsePlastics,
      shortname: "single-use-plastics",
      descriptions: [
        "✅ Bringing your own tote bags to stores",
        "✅ Using a garment bag for dry cleaning",
        "✅ Carrying reusable silverware to the office",
        "✅ Bringing a travel mug to coffee shops",
      ],
    },
    {
      id: 2,
      topic: "Boycott microbeads",
      title: "🔬 Boycott microbeads",
      bgImage: Microbead,
      shortname: "microbeads",
      descriptions: [
        "✅ Avoid microbeads products",
        "✅ Choose products with natural exfoliants",
        "✅ Support brands that explicitly avoid microplastics",
        "✅ Use apps/databases (e.g., Beat the Microbead) to identify safe products",
      ],
    },
    {
      id: 3,
      topic: "Purchase items secondhand",
      title: "💵 Purchase items secondhand",
      bgImage: Secondhand,
      shortname: "secondhand",
      descriptions: [
        "✅ Shop at thrift stores, garage sales, or online resale sites.",
        "✅ Borrow or rent items you rarely use",
      ],
    },
    {
      id: 4,
      topic: "Recycle",
      title: "♻️ Recycle",
      bgImage: RecyclingPlastics,
      shortname: "recycle",
      descriptions: [
        "In general, plastic recycling numbers 1, 2, and 5 are most commonly recyclable, while 3, 6, and 7 are generally not. Plastic number 4 is sometimes recyclable depending on local recycling facilities.",
        "✅ 1 (PET): Polyethylene terephthalate (plastic bottles)",
        "✅ 2 (HDPE): High-density polyethylene (milk containers, shampoo bottles)",
        "✅ 4 (LDPE): Low-density polyethylene (plastic food wraps)",
        "✅ 5 (PP): Polypropylene (yogurt containers, ketchup bottles)",
        "❌ 3 (PVC): Polyvinyl chloride (pipes, detergent containers)",
        "❌ 6 (PS): Polystyrene (foam cups, takeout containers)",
        "❌ 7 (Other): (baby bottles, sunglasses)",
      ],
    },
    {
      id: 5,
      topic: "Choose clothing made from natural fibers",
      title: "🐑 Choose clothing made from natural fibers",
      bgImage: NaturalFibres,
      shortname: "natural-fibers",
      descriptions: [
        "✅ Wash synthetic clothes less often (spot-clean when possible).",
        "✅ Use a microfiber filter/Guppy Friend bag in laundry",
        "✅ Air-dry synthetics (tumble drying releases more fibers)",
        "✅ Buy natural fabrics (cotton, linen, wool, hemp)",
        "✅ Check labels – avoid polyester/nylon blends",
      ],
    },
  ];

  return (
    <section className="flex justify-center">
      <Sidebar />
      <div className="py-12 flex flex-col gap-8 max-w-[60%] ml-[350px] h-full">
        {/*Navigator*/}
        <Navigator topic="Ocean Pollution" />
        <section className="flex flex-col gap-20">
          {/*How much plastic ends up in the ocean?*/}
          <div className="flex flex-col gap-10">
            <ExplanationBox
              topic="How much plastic ends up in the ocean?"
              link="https://youtu.be/Yomf5pBN8dY?si=bVP6jk2hym-ACn8V"
              section="plastic-ends-up-in-the-ocean"
            >
              <Highlighter
                highlightClassName="highlight"
                searchWords={[
                  "350 million tonnes",
                  "each year",
                  "1 and 2 million tonnes",
                  "oceans",
                  "0.5%",
                ]}
                autoEscape={true}
                caseSensitive={false}
                textToHighlight="The world produces around 350 million tonnes of plastic waste each year. Estimates vary, but recent high-quality studies suggest that between 1 and 2 million tonnes of plastic enter the oceans annually. That means 0.5% of plastic waste ends up in the ocean."
              />
            </ExplanationBox>
            <div className="flex flex-col gap-3">
              <h2 className="text-4xl font-semibold">
                Explore Data on Plastic Pollution
              </h2>
              <iframe
                src="https://ourworldindata.org/explorers/plastic-pollution?facet=none&country=USA~CHN~IND~GBR~MYS~DEU&hideControls=false&Metric=Plastic+emitted+to+ocean&Per+capita=true&Share+of+world+total=false&Source=Meijer+et+al.+%282021%29&tab=map"
                loading="lazy"
                style={{ width: "100%", height: "600px", border: "0px none" }}
                allow="web-share; clipboard-write"
              ></iframe>
            </div>
          </div>
          {/*Microplastics*/}
          <div className="flex flex-col gap-10">
            <h2 className="text-5xl font-semibold text-balance">
              Microplastics: The Invisible Invaders Choking Our Planet
            </h2>
            {/*What are microplastics?*/}
            <ExplanationBox
              topic="What are microplastics?"
              link="https://youtu.be/aiEBEGKQp_I?si=R95vhnLWfy8oyhI2"
            >
              <Highlighter
                highlightClassName="highlight"
                searchWords={[
                  "small",
                  "less than five millimeters",
                  "degradation",
                  "ubiquitous",
                  "marine species",
                  "drinking water",
                  "foods",
                ]}
                autoEscape={true}
                caseSensitive={false}
                textToHighlight="Microplastics are small plastic particles less than five millimeters long that come from the degradation of plastics, ubiquitous in nature and therefore affect both wildlife and humans. They have been detected in many marine species, but also in drinking water and in numerous foods, such as salt, honey and marine organisms."
              />
            </ExplanationBox>
            {/*Impacts of microplastics*/}
            <DropDown
              topic="Impacts of Microplastics"
              section="impacts-of-microplastics"
              info={impacts}
              link="https://youtu.be/4JUvvbpx2So?si=H3-rBox6O51Vv4R_"
            />
          </div>
          {/*Alternatives to plastic*/}
          <CardSlider
            topic="Alternatives to plastic"
            section="alternatives-to-plastic"
            display="bullet"
            info={causes}
          />
          {/*Habits to reduce plastic waste*/}
          <SlideShow
            topic="Habits to reduce plastic waste"
            info={habits}
            section="habits-to-reduce-plastic-waste"
          />
          {/*Turtle's Plastic Dodge*/}
          <section className="flex flex-col gap-5" id="turtles-plastic-dodge">
            <h2 className="text-5xl font-semibold">Turtle's Plastic Dodge</h2>
            <GameCanvas />
          </section>
          {/*Next Button*/}
          <NextButton page="Air Pollution" link="/air-pollution" />
        </section>
      </div>
    </section>
  );
}

export default OceanPollution;
