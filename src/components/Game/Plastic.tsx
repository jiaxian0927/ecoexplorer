import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBottleWater } from "@fortawesome/free-solid-svg-icons";

interface PlasticProps {
  top: number;
  left: number;
}

const Plastic = ({ top, left }: PlasticProps) => {
  const PlasticIcon = (
    <FontAwesomeIcon
      icon={faBottleWater}
      style={{
        color: "#74C0FC",
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
      }}
      className="text-5xl -translate-y-1/2"
    />
  );

  return <div>{PlasticIcon}</div>;
};

export default Plastic;
