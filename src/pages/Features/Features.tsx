import "./Features.css";
import * as tmImage from "@teachablemachine/image";
import { ScrollToTop } from "../../components/Discover/ScrollHelper";
import Button from "../../components/Button.tsx";
import Webcam from "react-webcam";
import { useRef, useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Features() {
  const disposalSuggestions: {
    [key: string]: { label: string; disposal: string; method: string };
  } = {
    cardboard_boxes: {
      label: "Cardboard",
      disposal: "Flatten and place in paper recycling bin",
      method: "recycle",
    },
    office_paper: {
      label: "Paper",
      disposal: "Place in paper recycling bin",
      method: "recycle",
    },
    aerosol_cans: {
      label: "Aerosol cans",
      disposal:
        "Empty and intact aerosol cans can be recycled, but partially or completely full cans are considered hazardous waste and should be disposed of accordingly. It's important to remove any plastic parts before recycling. If the can is not empty, it should be handled as household hazardous waste.",
      method: "recycle",
    },
    aluminum_food_cans: {
      label: "Aluminum",
      disposal: "Rinse and recycle",
      method: "recycle",
    },
    aluminum_soda_cans: {
      label: "Aluminum",
      disposal: "Rinse and recycle",
      method: "recycle",
    },
    cardboard_packaging: {
      label: "Cardboard",
      disposal: "Remove plastic/tape, then recycle",
      method: "recycle",
    },
    clothing: {
      label: "Clothing",
      disposal: "Donate if reusable – otherwise textile recycling",
      method: "recycle",
    },
    coffee_grounds: {
      label: "Coffee grounds",
      disposal: "Compost – enriches soil",
      method: "compost",
    },
    disposable_plastic_cultery: {
      label: "Disposable plastic cutlery",
      disposal: "Trash – often not recyclable due to size and material",
      method: "trash",
    },
    eggshells: {
      label: "Eggshells",
      disposal: "Compost – crush before composting",
      method: "compost",
    },
    food_waste: {
      label: "Food waste",
      disposal: "Compost or dispose via green bin",
      method: "compost",
    },
    glass_beverage_bottles: {
      label: "Glass",
      disposal: "Rinse and recycle – remove caps",
      method: "recycle",
    },
    glass_cosmetic_containers: {
      label: "Glass",
      disposal: "Rinse and recycle if clean",
      method: "recycle",
    },
    glass_food_jars: {
      label: "Glass",
      disposal: "Rinse and recycle – remove lids",
      method: "recycle",
    },
    magazines: {
      label: "Paper",
      disposal: "Place in paper recycling bin",
      method: "recycle",
    },
    newspaper: {
      label: "Paper",
      disposal: "Keep dry and place in recycling",
      method: "recycle",
    },
    paper_cups: {
      label: "Paper cups",
      disposal: "Check local rules – if wax-lined, may not be recyclable",
      method: "recycle",
    },
    plastic_cup_lids: {
      label: "Plastic cup lids",
      disposal: "Trash or recycle if accepted – check local rules",
      method: "recycle",
    },
    plastic_detergent_bottles: {
      label: "Plastic",
      disposal: "Rinse and recycle – place in plastic recycling",
      method: "recycle",
    },
    plastic_food_containers: {
      label: "Plastic",
      disposal: "Rinse and recycle – accepted in most curbside bins",
      method: "recycle",
    },
    plastic_shopping_bags: {
      label: "Plastic shopping bags",
      disposal: "Recycle at drop-off – not in curbside recycling",
      method: "recycle",
    },
    plastic_soda_bottles: {
      label: "Plastic",
      disposal: "Rinse and recycle – remove caps",
      method: "recycle",
    },
    plastic_straws: {
      label: "Plastic straws",
      disposal: "Trash – too small for recycling machines",
      method: "trash",
    },
    plastic_trash_bags: {
      label: "Plastic trash bags",
      disposal: "Trash – not recyclable if used",
      method: "trash",
    },
    plastic_water_bottles: {
      label: "Plastic",
      disposal: "Rinse and recycle – remove caps",
      method: "recycle",
    },
    shoes: {
      label: "Shoes",
      disposal: "Donate or recycle via shoe/textile programs",
      method: "recycle",
    },
    steel_food_cans: {
      label: "Steel",
      disposal: "Rinse and recycle",
      method: "recycle",
    },
    styrofoam_cups: {
      label: "Styrofoam",
      disposal: "Trash – rarely recyclable",
      method: "trash",
    },
    styrofoam_food_containers: {
      label: "Styrofoam",
      disposal: "Trash – not accepted in most recycling programs",
      method: "trash",
    },
    teabags: {
      label: "Teabags",
      disposal: "Compost – only if not plastic-lined",
      method: "compost",
    },
  };

  //Load the model
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadModel = async () => {
      const modelURL = "../../../AIModel/model.json";
      const metadataURL = "../../../AIModel/metadata.json";
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
      setLoading(false);
    };
    loadModel();
  }, []);

  ScrollToTop();

  const webcamRef = useRef<Webcam>(null);
  const [showScanResult, setShowScanResult] = useState(false);
  const [detectedWaste, setDetectedWaste] = useState<string>(
    "Unable to detect waste type. Please try again."
  );

  const handleCapture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      if (model && imageSrc) {
        const originalImg = new Image();
        originalImg.src = imageSrc;

        originalImg.onload = async () => {
          const canvas = document.createElement("canvas");
          canvas.width = 224;
          canvas.height = 224;
          const ctx = canvas.getContext("2d");
          const centerX = originalImg.width / 2;
          const centerY = originalImg.height / 2;
          const sx = centerX - 112;
          const sy = centerY - 112;

          if (ctx) {
            ctx.drawImage(originalImg, sx, sy, 224, 224, 0, 0, 224, 224);

            const prediction = await model.predict(canvas); // returns array of { className, probability }

            const bestPrediction = prediction.reduce((prev, current) =>
              current.probability > prev.probability ? current : prev
            );

            bestPrediction.probability < 0.8
              ? setDetectedWaste(
                  "Unable to detect waste type. Please try again."
                )
              : setDetectedWaste(bestPrediction.className);

            setShowScanResult(true);
          }
        };
      }
    }
  };

  const [mapsUrl, setMapsUrl] = useState("");

  useEffect(() => {
    if (showScanResult) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            const url = `https://www.google.com/maps/search/recycling+centers/@${latitude},${longitude},15z`;
            setMapsUrl(url);
          },
          (err) => {
            console.error("Geolocation error:", err.message);
          }
        );
      }
    }
  }, [showScanResult]);

  const [cameraActive, setCameraActive] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      const video = webcamRef.current?.video;
      if (video?.readyState === 4) {
        setCameraActive(true);
        clearInterval(interval); // Stop polling
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gradient-to-b from-[#edfef0] to-[#d9eddf] min-h-[calc(100vh-80px)] flex justify-center items-center">
      <div
        className={`bg-white/70 shadow-xl p-6 rounded-2xl flex gap-5 ${
          showScanResult ? "flex-row items-center" : "flex-col w-[500px]"
        }`}
      >
        {/*Loading Page*/}
        {loading ? (
          <div className="flex items-center justify-center gap-3 text-gray-700">
            <Box sx={{ display: "flex" }}>
              <CircularProgress size="30px" />
            </Box>
            <p>Loading model...</p>
          </div>
        ) : showScanResult ? (
          //Disposal Suggestions
          <>
            <div className="flex flex-col h-full gap-3 w-[500px]">
              <div className="p-3 bg-gray-200 rounded-xl text-lg flex flex-col gap-2">
                <p className="font-bold">🗑️ Detected waste</p>
                <div className="bg-gray-100 rounded-lg p-2 pr-4 text-md font-light">
                  <p>
                    {detectedWaste ===
                    "Unable to detect waste type. Please try again."
                      ? detectedWaste
                      : disposalSuggestions[
                          detectedWaste as keyof typeof disposalSuggestions
                        ]?.label}
                  </p>
                </div>
              </div>
              <div className="p-3 bg-gray-200 rounded-xl">
                <div className="flex flex-row gap-2 items-center mb-2">
                  <p className="font-bold text-lg">✨ Disposal suggestion</p>
                  <p
                    className={`font-medium rounded-lg py-1 px-2 text-sm ${
                      detectedWaste ===
                      "Unable to detect waste type. Please try again."
                        ? ""
                        : disposalSuggestions[
                            detectedWaste as keyof typeof disposalSuggestions
                          ]?.method === "recycle"
                        ? "bg-green-300 text-green-800"
                        : disposalSuggestions[
                            detectedWaste as keyof typeof disposalSuggestions
                          ]?.method === "compost"
                        ? "bg-yellow-300 text-yellow-800"
                        : "bg-red-300 text-red-800"
                    }
                  `}
                  >
                    {detectedWaste ===
                    "Unable to detect waste type. Please try again."
                      ? ""
                      : disposalSuggestions[
                          detectedWaste as keyof typeof disposalSuggestions
                        ]?.method ?? detectedWaste}
                  </p>
                </div>
                <div className="bg-gray-100 rounded-lg p-2 pr-4">
                  <p className="font-light text-md">
                    {detectedWaste ===
                    "Unable to detect waste type. Please try again."
                      ? "N/A"
                      : `✅ ${
                          disposalSuggestions[
                            detectedWaste as keyof typeof disposalSuggestions
                          ]?.disposal ?? detectedWaste
                        }`}
                  </p>
                  {detectedWaste ===
                  "Unable to detect waste type. Please try again." ? (
                    <a></a>
                  ) : disposalSuggestions[
                      detectedWaste as keyof typeof disposalSuggestions
                    ]?.method === "recycle" ? (
                    <div className="flex items-center gap-1 flex-row">
                      <p>🔍</p>
                      <a
                        href={mapsUrl}
                        className="text-green-600 text-sm font-medium hover:border-b hover:border-green-600 transition-all"
                      >
                        Search for recycling centers
                      </a>
                    </div>
                  ) : disposalSuggestions[
                      detectedWaste as keyof typeof disposalSuggestions
                    ]?.method === "compost" ? (
                    <div className="flex items-center gap-1 flex-row">
                      <p>🔍</p>
                      <a
                        href="https://youtu.be/egyNJ7xPyoQ?si=2_sCmhh9hkVFG015"
                        className="text-green-600 text-sm font-medium hover:border-b hover:border-green-600 transition-all"
                      >
                        Search for composting guide
                      </a>
                    </div>
                  ) : (
                    <a></a>
                  )}
                </div>
              </div>
              <Button
                cta="Scan Again"
                onClick={() => setShowScanResult(false)}
                className="py-2 rounded-xl w-full text-lg"
                level="primary"
              />
            </div>
          </>
        ) : (
          //Webcam
          <>
            <div className="relative">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="rounded-xl w-full h-auto"
                videoConstraints={{
                  facingMode: "user", // for back camera; use "user" for front camera
                }}
              />
              <div
                className="absolute border-2 border-green-500 rounded-xl border-dashed"
                style={{
                  width: "224px",
                  height: "224px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none", // allows clicks to pass through
                }}
              />
            </div>
            <Button
              cta="Start Scanning"
              onClick={handleCapture}
              className="py-2 rounded-xl w-full text-lg disabled:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              level="primary"
              disabled={!cameraActive}
            />
          </>
        )}
      </div>
    </section>
  );
}

export default Features;
