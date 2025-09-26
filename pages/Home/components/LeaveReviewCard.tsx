import { FiCalendar } from "react-icons/fi";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

interface LeaveReviewCardProps {
  name: string;
  dateRange: string;
}

const LeaveReviewCard: React.FC<LeaveReviewCardProps> = ({ name, dateRange }) => {
  return (
    <div className="bg-gray-50 px-4 py-3 rounded flex items-center justify-between hover:bg-gray-100">
      <div>
        <p className="font-medium">{name}</p>
        <div className="text-sm text-gray-500 flex items-center gap-1">
          <FiCalendar className="text-base" />
          <span>{dateRange}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 text-xl">
        <AiOutlineCheckCircle className="text-green-500 cursor-pointer" />
        <AiOutlineCloseCircle className="text-red-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default LeaveReviewCard;
