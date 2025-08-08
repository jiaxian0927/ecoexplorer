import "./ClimateChange.css";
import Sidebar from "../../components/Discover/Sidebar.tsx";
import ArrowDown from "../../assets/arrowDown.tsx";
import ArrowUp from "../../assets/arrowUp.tsx";
import AddIcon from "../../assets/addIcon.tsx";
import MinusIcon from "../../assets/minusIcon.tsx";
import PowerGenerators from "../../assets/powerGenerators.png";
import ProducingFood from "../../assets/producingFood.jpg";
import Transport from "../../assets/transportation.webp";
import TreeCutting from "../../assets/forestCutting.jpg";
import Manufacturing from "../../assets/manufacturing.jpg";
import RenewableEnergy from "../../assets/renewableEnergy.jpg";
import Travel from "../../assets/travel.jpg";
import Diet from "../../assets/diet.webp";
import Shopping from "../../assets/shopping.jpg";
import Activist from "../../assets/activist.jpg";
import TrendingUp from "../../assets/trendingUp.tsx";
import TrendingDown from "../../assets/trendingDown.tsx";
import { RadioGroup } from "../../components/Radio.tsx";
import { Radio } from "../../components/Radio.tsx";
import { useEffect, useState, useRef } from "react";
import noUiSlider, { API } from "nouislider";
import wNumb from "wnumb";
import "nouislider/dist/nouislider.css";
import { useForm } from "react-hook-form";
import { PieChart } from "@mui/x-charts/PieChart";
import Button from "../../components/Button.tsx";
import Navigator from "../../components/Discover/Navigator.tsx";
import Highlighter from "react-highlight-words";
import ExplanationBox from "../../components/Discover/ExplanationBox.tsx";
import DropDown from "../../components/Discover/DropDown.tsx";
import CardSlider from "../../components/Discover/CardSlider.tsx";
import SlideShow from "../../components/Discover/SlideShow.tsx";
import NextButton from "../../components/Discover/Next.tsx";
import {
  ScrollToTop,
  ScrollToHash,
} from "../../components/Discover/ScrollHelper.ts";

declare global {
  interface HTMLElement {
    noUiSlider?: API;
  }
}

function ClimateChange() {
  ScrollToTop();
  ScrollToHash();

  //Impacts of climate change
  const impacts = [
    {
      id: 1,
      title: "🔥 Hotter Temperature",
      shortname: "temperature",
      paragraph:
        "Nearly all land areas are seeing more hot days and heat waves; 2020 was one of the hottest years on record. Higher temperatures increase heat-related illnesses and can make it more difficult to work and move around. Wildfires start more easily and spread more rapidly when conditions are hotter.",
      textToHighlight: [
        "more hot days",
        "heat waves",
        "heat-related illnesses",
        "more difficult to work and move around",
        "Wildfires",
      ],
    },
    {
      id: 2,
      title: "🌪️ More severe storms",
      shortname: "storms",
      paragraph:
        "Changes in temperature cause changes in rainfall. This results in more severe and frequent storms. They cause flooding and landslides, destroying homes and communities, and costing billions of pounds.",
      textToHighlight: [
        "rainfall.",
        "more severe and frequent storms",
        "flooding and landslides",
        "destroying homes and communities",
      ],
    },
    {
      id: 3,
      title: "🍂 Increased drought",
      shortname: "drought",
      paragraph:
        "Water is becoming scarcer in more regions. Droughts can stir destructive sand and dust storms that can move billions of tons of sand across continents. Deserts are expanding, reducing land for growing food. Many people now face the threat of not having enough water on a regular basis.",
      textToHighlight: [
        "stir destructive sand and dust storms",
        "billions of tons of sand",
        " expanding, reducing land for growing food",
        "not having enough water",
      ],
    },
    {
      id: 4,
      title: "🌊 A warming, rising ocean",
      shortname: "ocean",
      paragraph:
        "The ocean soaks up most of the heat from global warming. This melts ice sheets and raises sea levels, threatening coastal and island communities. The ocean also absorbs carbon dioxide, keeping it from the atmosphere. More carbon dioxide makes the ocean more acidic, which endangers marine life.",
      textToHighlight: [
        "melts ice sheets and raises sea levels",
        "threatening coastal and island communities",
        " carbon dioxide",
        "more acidic",
        "endangers marine life",
      ],
    },
    {
      id: 5,
      title: "🌾 Not enough food",
      shortname: "food",
      paragraph:
        "Changes in climate and increases in extreme weather events are among the reasons behind a global rise in hunger and poor nutrition. Fisheries, crops, and livestock may be destroyed or become less productive. Heat stress can diminish water and grasslands for grazing.",
      textToHighlight: [
        "rise in hunger and poor nutrition",
        "destroyed",
        "less productive",
        "water and grasslands",
      ],
    },
    {
      id: 6,
      title: "🛖 Poverty and displacement",
      shortname: "poverty",
      paragraph:
        "Climate change increases the factors that put and keep people in poverty. Floods may sweep away urban slums, destroying homes and livelihoods. Heat can make it difficult to work in outdoor jobs. Weather-related disasters displace 23 million people a year, leaving many more vulnerable to poverty.",
      textToHighlight: [
        "Floods",
        "urban slums, destroying homes and livelihoods",
        "outdoor jobs",
        "23 million people",
      ],
    },
  ];

  //Causes of climate change
  const causes = [
    {
      id: 1,
      topic: "Generating power",
      title: "⚡ Generating power",
      bgUrl: PowerGenerators,
      shortname: "power",
      paragraph:
        "Generating electricity and heat by burning fossil fuels such as coal, oil and natural gas causes a large chunk of global emissions. Most electricity is still produced from fossil fuels; only about a quarter comes from wind, solar and other renewable sources.",
      textToHighlight: [
        "fossil fuels",
        "global emissions",
        "renewable sources",
      ],
    },
    {
      id: 2,
      title: "🏭 Manufacturing goods",
      topic: "Manufacturing goods",
      shortname: "manufacturing",
      bgUrl: Manufacturing,
      paragraph:
        "Manufacturing and industry produce emissions, mostly from burning fossil fuels to produce energy for making things like cement, iron, steel, electronics, plastics, clothes and other goods. Mining and other industrial processes also release gases.",
      textToHighlight: ["emissions", "fossil fuels", "Mining"],
    },
    {
      id: 3,
      title: "🌳 Cutting down forests",
      topic: "Cutting down forests",
      shortname: "tree",
      bgUrl: TreeCutting,
      paragraph:
        "Cutting down forests to create farms or pastures, or for other reasons, causes emissions, since trees, when they are cut, release the carbon they have been storing. Since forests absorb carbon dioxide, destroying them also limits nature's ability to keep emissions out of the atmosphere.",
      textToHighlight: [
        "farms or pastures",
        "emissions",
        "carbon",
        "absorb carbon dioxide",
      ],
    },
    {
      id: 4,
      title: "🚗 Using transportation",
      topic: "Using transportation",
      shortname: "transport",
      bgUrl: Transport,
      paragraph:
        "Most cars, lorries, ships and planes run on fossil fuels. That makes transportation a major contributor of greenhouse gases, especially carbon-dioxide emissions. Road vehicles account for the largest part, but emissions from ships and planes continue to grow.",
      textToHighlight: ["fossil fuels", "greenhouse gases"],
    },
    {
      id: 5,
      title: "🌽 Producing food",
      topic: "Producing food",
      shortname: "food",
      bgUrl: ProducingFood,
      paragraph:
        "Producing food requires energy to run farm equipment or fishing boats, usually with fossil fuels. Growing crops can also cause emissions, like when using fertilisers and manure. Cattle produce methane, a powerful greenhouse gas. And emissions also come from packaging and distributing food.",
      textToHighlight: [
        "energy",
        "fossil fuels",
        "emissions",
        "fertilisers and manure",
        "methane",
        "packaging and distributing food",
      ],
    },
  ];

  //Tips to reduce carbon footprints
  const tips = [
    {
      id: 1,
      topic: "Reduce your energy use and switch to renewable energy",
      title: "⚡ Reduce your energy use and switch to renewable energy",
      descriptions: [
        "✅ Switch to renewables",
        "✅ Use solar power where possible",
        "✅ Upgrade to LED & efficient appliances",
        "✅ Insulate homes properly",
      ],
      bgImage: RenewableEnergy,
      shortname: "energy",
    },
    {
      id: 2,
      topic: "Change the way you travel",
      title: "🚇 Change the way you travel",
      descriptions: [
        "✅ Reduce fossil fuel dependence",
        "✅ Prioritize zero-emission transport (walking, cycling, EVs)",
        "✅ Share rides/use public transit to cut per-person emissions",
        "✅ Fly less and smarter",
      ],
      bgImage: Travel,
      shortname: "travel",
    },
    {
      id: 3,
      topic: "Change what you eat",
      title: "🥗 Change what you eat",
      descriptions: [
        "✅ Increase plant-based foods",
        "✅ Promote sustainable animal products",
        "✅ Eliminate food waste",
      ],
      bgImage: Diet,
      shortname: "diet",
    },
    {
      id: 4,
      topic: "Change how much you buy and who you buy from",
      title: "💰 Change how much you buy and who you buy from",
      descriptions: [
        "✅ Cut unnecessary consumption to reduce waste/resource use",
        "✅ Prioritize products made from recycled materials",
        "✅ Support businesses with strong sustainability policies and supply chains",
      ],
      bgImage: Shopping,
      shortname: "shopping",
    },
    {
      id: 5,
      topic: "Campaign and vote",
      title: "🗳️ Campaign and vote",
      descriptions: [
        "✅ Join the Climate Movement",
        "✅ Advocate for Systemic Change",
        "✅ Vote for Climate Leaders",
      ],
      bgImage: Activist,
      shortname: "activist",
    },
  ];

  const [data, setData] = useState({
    percentagesCarbonFootprint: {
      energy: 0,
      transport: 0,
      flights: 0,
      diet: 0,
      shopping: 0,
    },
    totalFootprint: {
      year: 0,
      month: 0,
      day: 0,
    },
  });

  //Get results for carbon footprint
  type CarbonFootprintFormData = {
    homeEnergy: number; // kWh/year
    householdMembers: number;
    transportation: number; // liters/year
    flights: number; // km/year
    dietaryHabit: string;
    shoppingFrequency: number; // 0-100%
    retailFrequency: number; // 0-100%
    shipMethod: string; // "standard" | "express"
  };

  const {
    register, //Connects inputs to form state => {...register("homeEnergy")}
    handleSubmit, //Handles form submission => onSubmit={handleSubmit(calculate)}
    setValue, //Programmatically set values	=> setValue("shoppingFrequency", 50)
    watch, //Track specific fields =>	watch("dietaryHabit")
    formState: { errors }, //Contains validation errors => errors.homeEnergy?.message
  } = useForm<CarbonFootprintFormData>({
    defaultValues: {
      householdMembers: 1,
      dietaryHabit: "vegan",
      shipMethod: "standard",
      shoppingFrequency: 50,
      retailFrequency: 50,
    },
  });

  //Household members
  const handleIncreament = () => {
    if (watch("householdMembers") < 20) {
      setValue("householdMembers", watch("householdMembers") + 1);
    }
  };

  const handleDecreasement = () => {
    if (watch("householdMembers") > 1) {
      setValue("householdMembers", watch("householdMembers") - 1);
    }
  };

  //nouislider
  const sliderRef = useRef<HTMLDivElement>(null);

  //Percentages Normalization
  const normalizePercentages = (percentages: Record<string, number>) => {
    const entries = Object.entries(percentages); // Convert object to array of [key, value] pair
    const sum = entries.reduce((total, [, val]) => total + val, 0);

    // Adjust the largest component to fix rounding errors
    if (sum !== 100) {
      const largestIndex = entries.reduce(
        (maxIdx, [_, val], idx) => (val > entries[maxIdx][1] ? idx : maxIdx),
        0 //Search
      );
      entries[largestIndex][1] += 100 - sum;
    }

    return Object.fromEntries(entries) as typeof percentages;
  };

  // Initialize slider
  useEffect(() => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;

    noUiSlider.create(slider, {
      start: [watch("shoppingFrequency") || 50],
      connect: [true, false],
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
      tooltips: [
        wNumb({
          decimals: 0,
          suffix: "%",
        }),
      ],
      cssPrefix: "noUi-", // Explicit prefix
      behaviour: "tap-drag", // Better mobile handling
    });

    // Force initial hidden state
    const tooltips = slider.querySelectorAll(".noUi-tooltip");
    tooltips.forEach((t) => ((t as HTMLElement).style.display = "none"));

    // Mobile touch handling
    const handleInteraction = (show: boolean) => {
      tooltips.forEach((tooltip) => {
        const htmlTooltip = tooltip as HTMLElement;
        htmlTooltip.classList.toggle("display", !show);
        htmlTooltip.classList.toggle("none", show);
      });
    };

    slider.addEventListener("touchstart", () => handleInteraction(true));
    slider.addEventListener("touchend", () => {
      setTimeout(() => handleInteraction(false), 1000);
    });

    // Update React state when slider changes
    slider.noUiSlider?.on("update", (values) => {
      setValue("shoppingFrequency", Math.round(Number(values[0])));
      setValue("retailFrequency", 100 - Math.round(Number(values[0])));
    });

    // Cleanup function
    return () => {
      slider.noUiSlider?.destroy();
    };
  }, [setValue, watch]);

  interface FootprintResult {
    totalCarbon: {
      year: number;
      month: number;
      day: number;
    };
    percentages: {
      energy: number;
      transport: number;
      flights: number;
      diet: number;
      shopping: number;
    };
  }

  const calculateFootprint = (
    data: CarbonFootprintFormData
  ): FootprintResult => {
    const EmissionFactors = {
      electricity: 0.758,
      gasoline: 2.3,
      flights: 0.246,
      diet: {
        vegan: 1000,
        vegetarian: 1500,
        pescatarian: 1700,
        "litte-meat": 2000,
        "frequent-meat": 3000,
      },
      retail: 22.56 * 30,
      shipping: {
        standard: 28.56 * 30,
        express: 29.81 * 30,
      },
    };

    const DietType: keyof typeof EmissionFactors.diet =
      data.dietaryHabit as keyof typeof EmissionFactors.diet;
    const ShippingType: keyof typeof EmissionFactors.shipping =
      data.shipMethod as keyof typeof EmissionFactors.shipping;

    const energyFootprint =
      (data.homeEnergy * EmissionFactors.electricity) / data.householdMembers;
    const transportFootprint = data.transportation * EmissionFactors.gasoline;
    const flightFootprint = data.flights * EmissionFactors.flights;
    const dietFootprint = EmissionFactors.diet[DietType];
    const shoppingFootprint =
      EmissionFactors.retail * (data.retailFrequency / 100) +
      EmissionFactors.shipping[ShippingType] * (data.shoppingFrequency / 100);

    const totalCarbonYear = Math.round(
      energyFootprint +
        transportFootprint +
        flightFootprint +
        dietFootprint +
        shoppingFootprint
    );

    const totalCarbonMonth = Math.round(totalCarbonYear / 12);
    const totalCarbonDay = Math.round(totalCarbonYear / 365);

    const rawPercentages = {
      energy: Math.round((energyFootprint / totalCarbonYear) * 100) || 0,
      transport: Math.round((transportFootprint / totalCarbonYear) * 100) || 0,
      flights: Math.round((flightFootprint / totalCarbonYear) * 100) || 0,
      diet: Math.round((dietFootprint / totalCarbonYear) * 100) || 0,
      shopping: Math.round((shoppingFootprint / totalCarbonYear) * 100) || 0,
    };

    const normalized = normalizePercentages(rawPercentages);

    return {
      totalCarbon: {
        year: totalCarbonYear,
        month: totalCarbonMonth,
        day: totalCarbonDay,
      },
      percentages: {
        energy: normalized.energy,
        transport: normalized.transport,
        flights: normalized.flights,
        diet: normalized.diet,
        shopping: normalized.shopping,
      },
    };
  };

  //display result
  const [displayResult, setDisplayResult] = useState(false);

  const onSubmit = (data: CarbonFootprintFormData) => {
    // Calculate carbon footprint
    const totalFootprintYear = calculateFootprint(data).totalCarbon.year;
    const totalFootprintMonth = calculateFootprint(data).totalCarbon.month;
    const totalFootprintDay = calculateFootprint(data).totalCarbon.day;
    const percentages = calculateFootprint(data).percentages;

    // Format and set results
    setData({
      percentagesCarbonFootprint: {
        energy: percentages.energy,
        transport: percentages.transport,
        flights: percentages.flights,
        diet: percentages.diet,
        shopping: percentages.shopping,
      },
      totalFootprint: {
        year: totalFootprintYear,
        month: totalFootprintMonth,
        day: totalFootprintDay,
      },
    });

    setDisplayResult(true);
  };

  const [displayCarbonFootprint, setDisplayCarbonFootprint] =
    useState<number>(0);
  const [compareAverage, setCompareAverage] = useState<boolean>();
  const [calculateAverage, setCalcuateAverage] = useState<number>(0);
  const AverageCarbonFootprintPerCapita: number = 4700;

  useEffect(() => {
    if (displayResult) {
      setDisplayCarbonFootprint(data.totalFootprint.year);
      if (data.totalFootprint.year > AverageCarbonFootprintPerCapita) {
        setCompareAverage(true);
      } else {
        setCompareAverage(false);
      }
      setCalcuateAverage(
        Math.round(
          Math.abs(
            ((data.totalFootprint.year - AverageCarbonFootprintPerCapita) /
              AverageCarbonFootprintPerCapita) *
              100
          )
        )
      );
    }
  }, [displayResult]);

  //Change year/month/day
  const [displayTime, setDisplayTime] = useState<boolean>(false);
  const [time, setTime] = useState<string>("year");
  const timeSelection = [
    { id: 1, label: "year" },
    { id: 2, label: "month" },
    { id: 3, label: "day" },
  ];

  const handleTimeChange = (value: string) => {
    setTime(value);
    if (value === "year") {
      setDisplayCarbonFootprint(data.totalFootprint.year);
    } else if (value === "month") {
      setDisplayCarbonFootprint(data.totalFootprint.month);
    } else {
      setDisplayCarbonFootprint(data.totalFootprint.day);
    }
  };

  return (
    <section className="flex justify-center">
      <Sidebar />
      <div className="py-12 flex flex-col gap-8 max-w-[60%] ml-[350px] h-full">
        {/*Navigator*/}
        <Navigator topic="Climate Change" />
        {/*Main Structure*/}
        <section className="flex flex-col gap-20">
          {/*What is Climate Change?*/}
          <ExplanationBox
            topic="What is Climate Change?"
            link="https://youtu.be/dcBXmj1nMTQ?si=mzUDniU2fgFWYRLX"
            section="what-is-climate-change"
          >
            <Highlighter
              highlightClassName="highlight"
              searchWords={[
                "weather patterns change over a long time",
                "act differently",
                "greenhouse gases",
                "trap too much heat",
              ]}
              autoEscape={true}
              caseSensitive={false}
              textToHighlight="Climate change is when the Earth's weather patterns change over a long time. Normally, the Earth has different seasons like summer, winter, spring, and fall, but climate change is making these patterns act differently. The Earth is like a big blanket that keeps us warm. But when we use cars, factories, and even lights in our homes, we create something called greenhouse gases. These gases trap too much heat inside the Earth's 'blanket', making the planet warmer than it should be."
            />
          </ExplanationBox>
          {/*Impacts of climate change*/}
          <DropDown
            topic="Impacts of Climate Change"
            info={impacts}
            link="https://youtu.be/HsAUGbUgx6Y?si=YfNQXNUW8LzCytqU"
            section="impacts-of-climate-change"
          />
          {/*Causes of climate change*/}
          <CardSlider
            topic="Causes of climate change"
            display="paragraph"
            info={causes}
            section="causes-of-climate-change"
          />
          {/*Carbon footprints*/}
          <div className="flex flex-col gap-8">
            {/*Headline*/}
            <h2 className="text-5xl font-semibold leading-tight">
              Reducing Carbon Footprints: A Critical Step in Combating Climate
              Change
            </h2>
            {/*What is carbon footprint*/}
            <ExplanationBox
              topic="What is carbon footprint?"
              link="https://youtu.be/a9yO-K8mwL0?si=yo7xTgDGQrUARf9C"
            >
              <Highlighter
                highlightClassName="highlight"
                autoEscape={true}
                caseSensitive={false}
                searchWords={[
                  "total greenhouse gas emissions",
                  "CO2 equivalents",
                  "climate change",
                ]}
                textToHighlight="A carbon footprint measures the total greenhouse gas emissions, expressed as CO2 equivalents, caused directly or indirectly by a person, organization, product, or activity. The increasement in greenhouse gases emissions has contributed to the global climate change."
              />
            </ExplanationBox>
            {/*Tips to reduce carbon footprints*/}
            <SlideShow
              topic="Tips to reduce carbon footprints"
              info={tips}
              section="tips-to-reduce-carbon-footprints"
            />
          </div>
          {/*Carbon footprint calculator*/}
          <section
            className="flex flex-col gap-8"
            id="carbon-footprint-calculator"
          >
            {/*Headline*/}
            <h2 className="text-5xl font-semibold leading-tight">
              Carbon footprint calculator
            </h2>
            {displayResult === false ? (
              //Carbon footprint form
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-gray-100 w-full rounded-xl p-8 "
              >
                <div className="flex flex-col gap-5">
                  {/*Home energy*/}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-medium">1. Energy</h2>
                    <label htmlFor="homeEnergy">a. Household Electricity</label>
                    <input
                      type="number"
                      id="homeEnergy"
                      min="0"
                      placeholder="Enter kWh per year"
                      className="w-full py-3 px-4 border bg-white border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all"
                      {...register("homeEnergy", {
                        required: "Please enter your energy usage",
                        min: { value: 0, message: "Value cannot be negative" },
                        valueAsNumber: true, // Converts string input to number
                      })}
                    />
                    {errors.homeEnergy && (
                      <p className="text-red-500 text-sm">
                        {errors.homeEnergy.message}
                      </p>
                    )}
                    <p>b. Household members</p>
                    <div className="flex flex-row bg-white rounded-lg items-center justify-center border border-gray-300">
                      <button
                        type="button"
                        className={`bg-white h-16 flex flex-grow items-center justify-center rounded-l-lg ${
                          watch("householdMembers") === 20
                            ? "cursor-default"
                            : "hover:bg-gray-100 transition-all"
                        }`}
                        onClick={handleIncreament}
                        disabled={watch("householdMembers") === 20}
                      >
                        <AddIcon
                          className={`${
                            watch("householdMembers") === 20
                              ? "fill-gray-300"
                              : "fill-green-400"
                          }`}
                        />
                      </button>
                      <span className="text-black flex-1 text-center border-x border-gray-300 min-w-14 max-w-32 flex items-center justify-center">
                        {watch("householdMembers") || 1}
                      </span>
                      <button
                        type="button"
                        className={`bg-white h-16 flex flex-grow items-center justify-center text-xl rounded-r-lg ${
                          (watch("householdMembers") || 1) === 1
                            ? "cursor-default"
                            : "hover:bg-gray-100 transition-all"
                        }`}
                        onClick={handleDecreasement}
                        disabled={(watch("householdMembers") || 1) === 1}
                      >
                        <MinusIcon
                          className={`${
                            (watch("householdMembers") || 1) === 1
                              ? "fill-gray-300"
                              : "fill-green-400"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  {/*Transportation*/}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="transportation"
                      className="font-medium text-xl"
                    >
                      2. Transportation
                    </label>
                    <input
                      type="number"
                      id="transportation"
                      min="0"
                      placeholder="Enter liters of petrol consumed per year"
                      className="w-full py-3 px-4 border bg-white border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all"
                      {...register("transportation", {
                        required: "Please enter fuel consumption",
                        min: { value: 0, message: "Value cannot be negative" },
                        valueAsNumber: true, // Converts string input to number
                      })}
                    />
                    {errors.transportation && (
                      <p className="text-red-500 text-sm">
                        {errors.transportation.message}
                      </p>
                    )}
                  </div>
                  {/*Flights*/}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="flights" className="font-medium text-xl">
                      3. Flights
                    </label>
                    <input
                      type="number"
                      id="flights"
                      min="0"
                      placeholder="Enter the total distance traveled (in kilometers) per year"
                      className="w-full py-3 px-4 border bg-white border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all"
                      {...register("flights", {
                        required: "Please enter flight distance",
                        min: { value: 0, message: "Value cannot be negative" },
                        valueAsNumber: true,
                      })}
                    />
                    {errors.flights && (
                      <p className="text-red-500 text-sm">
                        {errors.flights.message}
                      </p>
                    )}
                  </div>
                  {/*Dietary habit*/}
                  <div className="flex flex-col gap-2">
                    <h2 className="font-medium text-xl">4. Dietary habit</h2>
                    {/*RadioGroup - The container that manages state*/}
                    <RadioGroup
                      name="dietaryHabit"
                      value={watch("dietaryHabit")}
                      onChange={(value) => setValue("dietaryHabit", value)}
                      className="space-y-1"
                    >
                      <Radio value="vegan">Vegan</Radio>
                      <Radio value="vegetarian">Vegetarian</Radio>
                      <Radio value="pescatarian">Pescatarian</Radio>
                      <Radio value="litte-meat">Litte meat</Radio>
                      <Radio value="frequent-meat">Frequent meat</Radio>
                    </RadioGroup>
                  </div>
                  {/*Shopping*/}
                  <div className="flex flex-col gap-3">
                    <h2 className="font-medium text-xl">5. Shopping</h2>
                    <div className="flex flex-col gap-2">
                      <p>a. How often do you shop online?</p>
                      <div ref={sliderRef} id="slider"></div>
                      <input
                        type="hidden"
                        id="shoppingFrequency"
                        {...register("shoppingFrequency")}
                      />
                    </div>
                    <p>b. Delivery method</p>
                    <RadioGroup
                      value={watch("shipMethod")}
                      onChange={(value) => setValue("shipMethod", value)}
                      name="shipMethod"
                      className="space-y-1"
                    >
                      <Radio value="standard">Standard</Radio>
                      <Radio value="express">Express</Radio>
                    </RadioGroup>
                  </div>
                  <Button
                    type="submit"
                    cta="Get results"
                    className="w-full py-2 rounded-lg text-xl col-span-full"
                    level="primary"
                    onClick={() => setTime("year")}
                  />
                </div>
              </form>
            ) : (
              //Carbon footprint result
              <div className="bg-gray-100 w-full rounded-xl p-8 grid grid-cols-2 gap-4">
                <h1 className="text-3xl font-semibold col-span-full">
                  Your Carbon Footprint
                </h1>
                {/*Total emissions (year/month/day)*/}
                <div className="bg-white rounded-lg py-5 px-8 flex flex-col shadow-md hover:scale-105 transition-all">
                  <h2 className="text-3xl text-green-600 font-semibold">
                    {displayCarbonFootprint}{" "}
                    <span className="text-lg text-black">kg CO2e</span>
                  </h2>
                  <div className="text-sm font-normal flex flex-row gap-1">
                    <p>Total emissions /</p>
                    <div className="relative">
                      <button
                        className="flex flex-row gap-1 bg-green-200 rounded-md px-2 items-center hover:bg-green-400 transition-all group"
                        onClick={() => setDisplayTime(!displayTime)}
                      >
                        <span className="text-green-600 group-hover:text-green-100">
                          {time}
                        </span>
                        {displayTime ? (
                          <ArrowUp className="size-[14px] fill-green-600 translate-y-[1px] group-hover:fill-green-100" />
                        ) : (
                          <ArrowDown className="size-[14px] fill-green-600 translate-y-[1px] group-hover:fill-green-100" />
                        )}
                      </button>

                      {/*Dropdown Menu*/}
                      <div
                        className={`absolute w-full bg-white left-0 rounded-md transition-all top-6 shadow-md ${
                          displayTime === true ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {timeSelection
                          .filter((selection) => selection.label !== time)
                          .map((selection, index, filteredArray) => (
                            <button
                              className={`py-1 w-full bg-white hover:bg-green-200 transition-all ${
                                index === 0
                                  ? "rounded-t-md"
                                  : index === filteredArray.length - 1
                                  ? "rounded-b-md"
                                  : ""
                              }`}
                              onClick={() => handleTimeChange(selection.label)}
                              key={selection.id}
                            >
                              <span>{selection.label}</span>
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/*Compare to global average*/}
                <div className="shadow-md bg-white rounded-lg py-5 px-8 flex flex-row items-center gap-3 hover:scale-105 transition-all">
                  {compareAverage ? (
                    <TrendingUp className="fill-red-600" />
                  ) : (
                    <TrendingDown className="fill-green-600" />
                  )}
                  <div className="leading-none">
                    <h2
                      className={`text-3xl font-semibold ${
                        compareAverage ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {calculateAverage}%
                    </h2>
                    <p
                      className={`${
                        compareAverage ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {compareAverage
                        ? "higher than global everage"
                        : "lower than global everage"}
                    </p>
                  </div>
                </div>
                {/*Pie chart*/}
                <div className="col-span-full flex bg-white py-5 rounded-lg shadow-md hover:scale-105 transition-all">
                  <PieChart
                    className="-translate-x-12"
                    colors={[
                      "#4ADE80",
                      "#2DD4BF",
                      "#F87171",
                      "#818CF8",
                      "#FBBF24",
                    ]}
                    series={[
                      {
                        data: [
                          {
                            id: 0,
                            value: data.percentagesCarbonFootprint.energy || 0,
                            label: "Home Energy",
                          },
                          {
                            id: 1,
                            value:
                              data.percentagesCarbonFootprint.transport || 0,
                            label: "Transportation",
                          },
                          {
                            id: 2,
                            value: data.percentagesCarbonFootprint.flights || 0,
                            label: "Flights",
                          },
                          {
                            id: 3,
                            value: data.percentagesCarbonFootprint.diet || 0,
                            label: "Diet",
                          },
                          {
                            id: 4,
                            value:
                              data.percentagesCarbonFootprint.shopping || 0,
                            label: "Shopping",
                          },
                        ],
                        highlightScope: { fade: "global", highlight: "item" },
                        faded: {
                          innerRadius: 20,
                          additionalRadius: -20,
                          color: "gray",
                        },
                        valueFormatter: (item) => `${item.value}%`,
                      },
                    ]}
                    width={550}
                    height={250}
                  />
                </div>
                {/*Back button*/}
                <Button
                  cta="Back"
                  className="w-full py-2 rounded-lg text-xl col-span-full"
                  level="primary"
                  onClick={() => setDisplayResult(false)}
                />
              </div>
            )}
          </section>
        </section>
        {/*Next Button*/}
        <NextButton page="Deforestation" link="/deforestation" />
      </div>
    </section>
  );
}

export default ClimateChange;
