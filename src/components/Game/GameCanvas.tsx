import { useEffect, useState, useRef } from "react";
import Turtle from "./Turtle";
import Plastic from "./Plastic";
import useGameLoop from "./useGameLoop";
import { generateObjectsTool } from "./GameHelpers";
import Fish from "./Fish";
import CollectSound from "../../assets/collectSound.mp3";
import ErrorSound from "../../assets/errorSound.mp3";

const GameCanvas = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [divWidth, setDivWidth] = useState(0);
  const [gameReady, setGameReady] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef<number | null>(null);
  const collectSoundRef = useRef<HTMLAudioElement | null>(null);
  const errorSoundRef = useRef<HTMLAudioElement | null>(null);
  const [highestScore, setHighestScore] = useState(0);

  useEffect(() => {
    collectSoundRef.current = new Audio(CollectSound);
    errorSoundRef.current = new Audio(ErrorSound);
  }, []);

  useEffect(() => {
    const handleGameStart = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setScore(0);
        setLife(3);
        setTimeLeft(30);
        setObstacles([]);
        setGameEnd(false);
        setGameStart(true);
      }
    };
    window.addEventListener("keydown", handleGameStart);
    return () => window.removeEventListener("keydown", handleGameStart);
  }, []);

  useEffect(() => {
    if (divRef.current) {
      const width = divRef.current.offsetWidth;
      setDivWidth(width);
      setGameReady(true);

      //Handle window resize
      const handleResize = () => {
        if (divRef.current) {
          setGameReady(false);
          const newWidth = divRef.current.offsetWidth;
          setDivWidth(newWidth);
        }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (divWidth > 0) {
      setGameReady(true);
    }
  }, [divWidth]);

  const [turtlePosition, setTurtlePosition] = useState(225);
  const turtlePositionRef = useRef(turtlePosition);
  const [obstacles, setObstacles] = useState<
    Array<{ left: number; top: number; collision: boolean; type: string }>
  >([]);
  const [score, setScore] = useState(0);
  const [life, setLife] = useState(3);

  //Handle keyboard events
  useEffect(() => {
    if (!gameStart) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault(); // Prevent default scrolling behavior
      }
      if (e.key === "ArrowUp") {
        setTurtlePosition((prev) => Math.max(prev - 40, 100)); // Move up
      } else if (e.key === "ArrowDown") {
        setTurtlePosition((prev) => Math.min(prev + 40, 450)); // Move down
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStart]);

  useEffect(() => {
    turtlePositionRef.current = turtlePosition; // Update the ref whenever the turtle position changes
  }, [turtlePosition]);

  // Game loop callback (to be called at a fixed interval)
  const updateGame = () => {
    //Move obstacles and check for collisions
    setObstacles((prev) => {
      let collisionCountPlastic = 0;
      let collisionCountFish = 0;
      const updatedObstacles = prev.map((obs) => {
        const newLeft = obs.left - 5;
        const hasCollied =
          !obs.collision &&
          newLeft < 120 &&
          Math.abs(obs.top - turtlePositionRef.current) < 60;

        if (hasCollied) {
          if (obs.type === "plastic") {
            collisionCountPlastic++;
            if (errorSoundRef.current) {
              errorSoundRef.current.currentTime = 0;
              errorSoundRef.current.play();
            }
          } else {
            collisionCountFish++;
            if (collectSoundRef.current) {
              collectSoundRef.current.currentTime = 0;
              collectSoundRef.current.play();
            }
          }

          obs.collision = true;
          console.log("collision detected");
        }

        return {
          ...obs,
          left: newLeft,
          collision: obs.collision,
        };
      });

      const newObstacles = updatedObstacles.filter(
        (obs) => obs.left > 40 && !obs.collision
      );

      if (collisionCountPlastic > 0) {
        setLife((prev) => prev - collisionCountPlastic);
      }

      if (collisionCountFish > 0) {
        setScore((prev) => prev + collisionCountFish * 5);
      }
      return newObstacles;
    });
  };

  const generateObjects = () => {
    //Spawn new obstacles and fishes randomly
    const rand = Math.random();
    if (rand <= 0.5) {
      setObstacles((prev) => [
        ...prev,
        generateObjectsTool(divWidth, "plastic"),
      ]);
    } else if (rand > 0.5) {
      setObstacles((prev) => [...prev, generateObjectsTool(divWidth, "fish")]);
    }
  };

  // Use the custom game loop hook
  useGameLoop(updateGame, 60, gameReady && gameStart && !gameEnd); // 60 FPS
  useGameLoop(generateObjects, 1, gameReady && gameStart && !gameEnd);

  useEffect(() => {
    if (gameStart) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!); //stop the timer
            setGameStart(false);
            setGameEnd(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameStart]);

  useEffect(() => {
    if (life <= 0) {
      setGameEnd(true);
      setGameStart(false);
    }
  }, [life]);

  useEffect(() => {
    if (gameEnd) {
      if (highestScore === 0) {
        const currentScore = score;
        setHighestScore(currentScore);
      } else {
        const currentScore = score;
        if (currentScore > highestScore) {
          setHighestScore(currentScore);
        }
      }
    }
  }, [gameEnd]);

  return (
    <div
      className="w-full h-[500px] bg-blue-100 rounded-xl relative font-game text-balance"
      ref={divRef}
    >
      {!gameStart && gameEnd ? (
        <div className="absolute w-[400px] h-[350px] bg-black/60 rounded-xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-8 justify-center items-center text-white text-xl text-center shadow-xl">
          {life > 0 ? (
            <h1 className="text-3xl">End Game</h1>
          ) : (
            <h1 className="text-3xl">You Lose</h1>
          )}
          <div className="flex flex-col gap-3">
            <h1 className="text-green-400">Score: {score}</h1>
            <h1 className="text-blue-400">Highest Score: {highestScore}</h1>
            <h1 className="text-red-400">Life: {life}</h1>
          </div>
          <h1>
            <span className="text-lg bg-black py-1 px-2 rounded-md mx-1">
              Space
            </span>
            to replay
          </h1>
        </div>
      ) : gameStart && !gameEnd ? (
        <div>
          <Turtle position={turtlePosition} />
          {obstacles.map((obs, index) =>
            obs.type === "plastic" ? (
              <Plastic key={index} left={obs.left} top={obs.top} />
            ) : (
              <Fish key={index} left={obs.left} top={obs.top} />
            )
          )}
          <div className="absolute top-5 left-0 right-0 flex flex-row items-center gap-20 justify-center">
            <p>Score: {score}</p>
            <p>Life: {life}</p>
            <p>Time: {timeLeft}s</p>
          </div>
        </div>
      ) : (
        <div className="absolute w-[400px] h-[350px] bg-black/60 bg-opacity-50 rounded-xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-8 justify-center items-center text-white text-xl text-center shadow-xl">
          <h1>
            Enter
            <span className="text-lg bg-black py-1 px-2 rounded-md mx-1">
              space
            </span>
            to play
          </h1>
          <h1>
            <span className="text-lg bg-black py-1 px-2 rounded-md mx-1">
              ↑/↓
            </span>
            to swim
          </h1>
          <h1>
            Dodge <span className="text-red-500">plastic</span>, collect{" "}
            <span className="text-blue-500">fish</span>!
          </h1>
        </div>
      )}
    </div>
  );
};

export default GameCanvas;
