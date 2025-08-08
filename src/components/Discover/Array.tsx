import { useState, useEffect } from "react";

const UseArrayNavigation = <T,>(
  initialIndex: number,
  containerWidth: number,
  array: T[],
  loop: "able" | "unable",
  gap: number
) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [displayIndexs, setDisplayIndexs] = useState<number[]>([
    (initialIndex - 2 + array.length) % array.length,
    (initialIndex - 1 + array.length) % array.length,
    initialIndex,
    (initialIndex + 1) % array.length,
    (initialIndex + 2) % array.length,
  ]);

  // Update displayIndexs whenever currentIndex changes
  useEffect(() => {
    setDisplayIndexs([
      (currentIndex - 2 + array.length) % array.length,
      (currentIndex - 1 + array.length) % array.length,
      currentIndex,
      (currentIndex + 1) % array.length,
      (currentIndex + 2) % array.length,
    ]);
  }, [currentIndex, array.length]);

  const goForward = () => {
    if (loop === "unable") {
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, array.length - 1)); //prevent the index number greater than the length of the array
    } else if (loop === "able") {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % array.length);
    }
  };

  const goBackward = () => {
    if (loop === "unable") {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0)); //prevent the index number smaller than 0
    } else if (loop === "able") {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? array.length - 1 : prevIndex - 1
      );
    }
  };

  const calculateTotalShift = (): number => {
    if (loop === "unable") {
      return containerWidth * currentIndex + currentIndex * gap;
    } else if (loop === "able") {
      return containerWidth + gap;
    }
    return 0; // Default return value to ensure a number is always returned
  };

  const totalShift: number = calculateTotalShift();

  return {
    currentIndex,
    goForward,
    goBackward,
    totalShift,
    displayIndexs,
  };
};

export default UseArrayNavigation;
