import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToHash = () => { //Scroll to the hash smoothly
  const location = useLocation(); //current URL infomation

  useEffect(() => {
    const hash = location.hash; 
    if (hash) {
      const id = hash.replace("#", "");
      const scrollToElement = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      // Delay a bit to wait for content to render
      setTimeout(scrollToElement, 500);
    }
  }, [location.hash]);
}

export const ScrollToTop = () => { //Scroll to the top once the pathname(e.g. /deforestation) changes
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
}
