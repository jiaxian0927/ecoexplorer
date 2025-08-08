import { Link } from "react-router-dom";
import ArrowForward from "../../assets/arrowForward.tsx";

interface NextButtonProps {
  page: string;
  link: string;
}

const NextButton = ({ page, link }: NextButtonProps) => {
  return (
    <div className="flex flex-row-reverse">
      <Link to={link}>
        <button className="flex flex-row gap-1 items-center transition-all hover:border-b hover:border-green-600">
          <p className="text-xl font-semibold text-green-600">{page}</p>
          <ArrowForward className="fill-green-600" />
        </button>
      </Link>
    </div>
  );
};

export default NextButton;
