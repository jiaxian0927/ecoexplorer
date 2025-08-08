import "./Sidebar.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const [activeId, setActiveId] = useState("");
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (!activeId) return;

    const activeButton = document.getElementById(`sidebar-${activeId}`);
    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        block: "nearest", // 'nearest' ensures minimal scrolling
      });
    }
  }, [activeId]);

  const navItems = [
    {
      id: 1,
      topic: "🌡️ Climate Change",
      route: "climate-change",
      links: [
        {
          targetName: "What is climate change?",
          target: "what-is-climate-change",
        },
        {
          targetName: "Impacts of climate change",
          target: "impacts-of-climate-change",
        },
        {
          targetName: "Causes of climate change",
          target: "causes-of-climate-change",
        },
        {
          targetName: "Tips to reduce carbon footprints",
          target: "tips-to-reduce-carbon-footprints",
        },
        {
          targetName: "Carbon footprint calculator",
          target: "carbon-footprint-calculator",
        },
      ],
    },
    {
      id: 2,
      topic: "🌳 Deforestation",
      route: "deforestation",
      links: [
        {
          targetName: "Why trees are important?",
          target: "why-trees-are-important",
        },
        {
          targetName: "Impacts of deforestation",
          target: "impacts-of-deforestation",
        },
        {
          targetName: "Ways to save trees",
          target: "ways-to-save-trees",
        },
        {
          targetName: "Success stories of reforestation",
          target: "success-stories-of-reforestation",
        },
        {
          targetName: "Global Forest Timeline",
          target: "global-forest-timeline",
        },
      ],
    },
    {
      id: 3,
      topic: "🪸 Ocean Pollution",
      route: "ocean-pollution",
      links: [
        {
          targetName: "Plastic ends up in the ocean",
          target: "plastic-ends-up-in-the-ocean",
        },
        {
          targetName: "Impacts of microplastics",
          target: "impacts-of-microplastics",
        },
        {
          targetName: "Alternatives to plastic",
          target: "alternatives-to-plastic",
        },
        {
          targetName: "Habits to reduce plastic waste",
          target: "habits-to-reduce-plastic-waste",
        },
        {
          targetName: "Turtle’s Plastic Dodge",
          target: "turtles-plastic-dodge",
        },
      ],
    },
    {
      id: 4,
      topic: "🏭 Air Pollution",
      route: "air-pollution",
      links: [
        {
          targetName: "Why tackle air pollution?",
          target: "why-tackle-air-pollution",
        },
        {
          targetName: "Types of air pollutants",
          target: "types-of-air-pollutants",
        },
        {
          targetName: "Causes of air pollution",
          target: "causes-of-air-pollution",
        },
        {
          targetName: "Ways to reduce air pollution",
          target: "ways-to-reduce-air-pollution",
        },
        {
          targetName: "Air Quality Index (AQI)",
          target: "air-quality-index-aqi",
        },
      ],
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentId = "";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 220 && rect.bottom >= 220) {
          //Is this section currently visible around 220px from the top of the viewport?
          currentId = section.id;
        }
      });
      if (currentId) setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initially
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="h-[calc(100vh-81.6px)] overflow-y-scroll overscroll-y-contain w-[350px] bg-[#F7F7F8] border-r border-gray-300 px-5 py-10 fixed -translate-x-[calc(50vw-50%)]"
      ref={sidebarRef}
    >
      <div className="flex flex-col gap-8">
        {navItems.map((item) => (
          <div key={item.id} className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">{item.topic}</h2>
            <div>
              {item.links.map((link, index) => (
                <button
                  id={`sidebar-${link.target}`}
                  key={`${item.id}-${index}`}
                  onClick={() => {
                    if (location.pathname === `/${item.route}`) {
                      // already on the target page
                      const element = document.getElementById(link.target);
                      if (element) {
                        element.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    } else {
                      // navigate to target page and preserve hash
                      navigate(`/${item.route}#${link.target}`);
                    }
                  }}
                  className={`border-l transition-all rounded-r-xl w-full text-left ${
                    activeId === link.target
                      ? "bg-gray-200 border-black/65 text-black/75"
                      : "text-black hover:text-black/75 hover:border-black/65 hover:bg-gray-200 border-gray-300"
                  }`}
                >
                  <span className="text-lg font-normal px-3 block">
                    {link.targetName}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default Sidebar;
