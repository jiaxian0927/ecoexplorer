import TurtleIcon from "../../assets/sea-turtle.png";

interface TurtleProps {
  position: number;
}

const Turtle = ({ position }: TurtleProps) => {
  return (
    <div
      className="absolute left-10 -translate-y-1/2"
      style={{ top: `${position}px` }}
    >
      <img src={TurtleIcon} alt="turtle-icon" className="size-20" />
    </div>
  );
};

export default Turtle;
