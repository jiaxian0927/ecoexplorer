import { useEffect, useState } from "react";
import "./Header.css";
import Menu from "../assets/menu.tsx";
import Close from "../assets/close.tsx";
import DarkIcon from "../assets/dark_mode.tsx";
import LightIcon from "../assets/light_mode.tsx";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "./Button.tsx";
import { signInWithGoogle, logOut } from "../utility/auth.ts";

function Header({
  username,
  setChangeUsername,
}: {
  username: string | null;
  setChangeUsername: (val: boolean) => void;
}) {
  //useState Menu icon toggle
  const [open, setOpen] = useState(false);

  //Appearance (Dark/Light) icon toggle
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );

  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function onWindowMatch() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }

  onWindowMatch();

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);

  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  });

  //Hover Effect - Animated Underline
  const [hovered, setHovered] = useState<{ [key: string]: boolean }>({
    discover: false,
    quiz: false,
    features: false,
  });

  const navItems = [
    { id: 1, label: "Discover", href: "/discover" },
    { id: 2, label: "Quiz", href: "/quiz" },
    { id: 3, label: "Features", href: "/features" },
    { id: 4, label: "Community", href: "/community" },
  ];

  //Glass Effect & Border Bottom Effect - Animated Header OnScroll
  const { scrollY } = useScroll();

  const glassOpacity = useTransform(scrollY, [40, 80], [1, 0.7]);
  const backgroundColor = useTransform(
    glassOpacity,
    (opacity) => `rgba(237, 254, 240, ${opacity})`
  );
  const borderBottomWidth = useTransform(scrollY, [50, 100], [0, 1]);

  const [showAccountInfo, setShowAccountInfo] = useState(false);

  return (
    <motion.header
      className="sticky top-0 dark:bg-[#1e272e] dark:text-white backdrop-blur-sm h-20 flex items-center"
      style={{
        zIndex: "100",
        backgroundColor,
        borderBottomWidth,
        borderBottomStyle: "solid",
        borderBottomColor: "#d0d0d0",
      }}
    >
      <nav className="flex justify-between items-center w-[92%] mx-auto p-4">
        {/*Earth Logo & Save Our Earth*/}
        <button onClick={() => (window.location.href = "/")}>
          <div className="flex items-center gap-2">
            <img
              src="favicon.png"
              alt="website-logo"
              className="h-[1.5em] w-[1.5em] object-contain"
            />
            <h1 className="font-semibold text-lg text-black">Save Our Earth</h1>
          </div>
        </button>
        {/*Navbar Links (Laptop View)*/}
        <div className="hidden md:block md:static md:min-h-fit md:w-auto md:px-0 text-black">
          <ul className="md:flex md:flex-row md:items-center md:gap-16">
            {navItems.map((item) => (
              <motion.li
                key={item.id}
                className="flex flex-col"
                onHoverStart={() =>
                  setHovered((prev) => ({
                    ...prev,
                    [item.label.toLowerCase()]: true,
                  }))
                }
                onHoverEnd={() =>
                  setHovered((prev) => ({
                    ...prev,
                    [item.label.toLowerCase()]: false,
                  }))
                }
              >
                <Link to={item.href}>{item.label}</Link>
                <div
                  className={`border-t-2 border-green-400 transition-all delay-200 duration-300 ease-in-out ${
                    hovered[item.label.toLowerCase()] ? "w-full" : "w-0"
                  }`}
                ></div>
              </motion.li>
            ))}
          </ul>
        </div>
        {/*Log in & Sign up & Appearance (Dark/Light) (Laptop View)*/}
        <div className="hidden md:flex md:static md:min-h-fit md:w-auto md:px-0 md:flex-row md:gap-[15px] md:items-center">
          {theme === "light" ? (
            //Dark mode icon
            <button className="hidden" onClick={() => setTheme("dark")}>
              <DarkIcon />
            </button>
          ) : (
            //Light mode icon
            <button className="hidden" onClick={() => setTheme("light")}>
              <LightIcon />
            </button>
          )}
          {username ? (
            //User account info
            <div
              className={`bg-green-200 relative text-sm font-medium text-black p-2 rounded-xl flex items-center hover:bg-green-300 transition-all hover:scale-105 max-w-[300px] min-w-[200px] justify-between ${
                showAccountInfo ? "bg-green-300 scale-105" : ""
              }`}
              onClick={() => setShowAccountInfo((prev) => !prev)}
            >
              {/*User Icon*/}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
              </svg>
              {/*Username*/}
              <p className="pl-2">{username}</p>
              {/*Dropdown Icon*/}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
                className={` ${
                  showAccountInfo ? "rotate-180" : ""
                } transition-transform duration-300`}
              >
                <path d="M480-360 280-560h400L480-360Z" />
              </svg>
              <div
                className={` ${
                  showAccountInfo
                    ? "absolute top-[125%] left-0 right-0 bg-white rounded-xl p-2 shadow-lg flex flex-col"
                    : "hidden"
                } `}
              >
                {/*Leaderboard*/}
                <Link to="/community">
                  <button className="flex flex-row gap-2 items-center hover:bg-gray-100 transition-all p-2 rounded-lg w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M80-600v-160q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v160h-80v-160H160v160H80Zm80 360q-33 0-56.5-23.5T80-320v-200h80v200h640v-200h80v200q0 33-23.5 56.5T800-240H160ZM40-120v-80h880v80H40Zm440-420ZM80-520v-80h240q11 0 21 6t15 16l47 93 123-215q5-9 14-14.5t20-5.5q11 0 21 5.5t15 16.5l49 98h235v80H620q-11 0-21-5.5T584-542l-26-53-123 215q-5 10-15 15t-21 5q-11 0-20.5-6T364-382l-69-138H80Z" />
                    </svg>
                    <p>EcoCommunity</p>
                  </button>
                </Link>
                {/*Change username*/}
                <button
                  className="flex flex-row gap-2 items-center hover:bg-gray-100 transition-all p-2 rounded-lg"
                  onClick={() => setChangeUsername(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                  >
                    <path d="M400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-8 18-13.5 37.5T404-360h-4q-71 0-127.5 18T180-306q-9 5-14.5 14t-5.5 20v32h252q6 21 16 41.5t22 38.5H80Zm560 40-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80Zm40-120q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-560q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Zm12 400Z" />
                  </svg>
                  <p>Change username</p>
                </button>
                {/*Log out*/}
                <button
                  className="flex flex-row gap-2 items-center hover:bg-gray-100 transition-all p-2 rounded-lg"
                  onClick={logOut}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#F05252"
                  >
                    <path d="M538-538ZM424-424Zm56 264q51 0 98-15.5t88-44.5q-41-29-88-44.5T480-280q-51 0-98 15.5T294-220q41 29 88 44.5t98 15.5Zm106-328-57-57q5-8 8-17t3-18q0-25-17.5-42.5T480-640q-9 0-18 3t-17 8l-57-57q19-17 42.5-25.5T480-720q58 0 99 41t41 99q0 26-8.5 49.5T586-488Zm228 228-58-58q22-37 33-78t11-84q0-134-93-227t-227-93q-43 0-84 11t-78 33l-58-58q49-32 105-49t115-17q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 59-17 115t-49 105ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-59 16.5-115T145-701L27-820l57-57L876-85l-57 57-615-614q-22 37-33 78t-11 84q0 57 19 109t55 95q54-41 116.5-62.5T480-360q38 0 76 8t74 22l133 133q-57 57-130 87T480-80Z" />
                  </svg>
                  <p className="text-red-500">Log out</p>
                </button>
              </div>
            </div>
          ) : (
            //Sign in
            <div className="flex justify-between items-center gap-[10px]">
              <Button
                cta="Sign in"
                className="w-[100px] py-3 rounded-3xl"
                onClick={signInWithGoogle}
                level="primary"
              />
            </div>
          )}
        </div>
        {/*Menu icon & Appearance (Dark/Light) (Mobile View)*/}
        <div className="flex justify-center items-center gap-[5vw] md:hidden">
          {theme === "light" ? (
            //Dark mode icon
            <button className="" onClick={() => setTheme("dark")}>
              <DarkIcon />
            </button>
          ) : (
            //Light mode icon
            <button className="" onClick={() => setTheme("light")}>
              <LightIcon />
            </button>
          )}
          <button
            id="menu"
            className="text-3xl focus:outline-none cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              //Close icon
              <Close fillColor={theme === "light" ? "#333333" : "white"} />
            ) : (
              //Menu icon
              <Menu fillColor={theme === "light" ? "#333333" : "white"} />
            )}
          </button>
        </div>
      </nav>
      {/*Navbar Links & Log in & Sign up (Mobile view)*/}
      <nav
        className={`px-[calc(1rem+4vw)] flex flex-col gap-[9vw] pb-[3vh] md:hidden absolute z-10 left-0 right-0 bg-white dark:bg-[#1e272e] dark:text-white" ${
          open ? "fadeIn" : "fadeOut"
        } ${open && theme === "light" ? "border-b border-gray-300" : ""}
        `}
        style={{
          animation: open
            ? "fadeIn 0.3s ease-in-out forwards"
            : "fadeOut 0.3s ease-in-out forwards",
        }}
      >
        <div className="md:hidden">
          <ul className="flex flex-col gap-[8vw]">
            <li>
              <a
                className="border-none rounded-lg p-2 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-700"
                href="#"
              >
                Discover
              </a>
            </li>
            <li>
              <a
                className="border-none rounded-lg p-2 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-700"
                href="#"
              >
                Features
              </a>
            </li>
            <li>
              <a
                className="border-none rounded-lg p-2 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-700"
                href="#"
              >
                Engage
              </a>
            </li>
          </ul>
        </div>
        <div className="md:hidden flex flex-col gap-[3vw]">
          <button className="bg-white border-gray-300 border px-4 py-2 rounded-lg font-medium hover:bg-gray-200 w-full dark:border-none dark:text-[#1e272e]">
            Log in
          </button>
          <button className=" bg-green-100 hover:text-green-800 hover:shadow-lg text-green-600 px-4 py-2 rounded-lg font-medium  w-full">
            Sign up
          </button>
        </div>
      </nav>
    </motion.header>
  );
}

export default Header;
