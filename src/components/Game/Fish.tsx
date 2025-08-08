import FishIcon from "../../assets/atlantic-cod.png";

interface FishProps {
  top: number;
  left: number;
}

const Fish = ({ top, left }: FishProps) => {
  return (
    <div
      className="absolute -translate-y-1/2"
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      <img src={FishIcon} alt="Fish" className="size-[48px]" />
    </div>
  );
};

export default Fish;
