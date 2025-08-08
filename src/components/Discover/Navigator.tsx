import ArrowForward from "../../assets/arrowForward";

interface NavigatorProps {
  topic: string;
}

const Navigator = ({ topic }: NavigatorProps) => {
  return (
    <h2 className="flex flex-row items-center gap-2 text-xl font-medium text-green-600">
      Discover
      <ArrowForward className="fill-[#16a34a]" />
      {topic}
    </h2>
  );
};

export default Navigator;
