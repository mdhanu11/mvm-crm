import { FiEye, FiEdit2 } from "react-icons/fi";
import Tag from "../../../components/ui/Tag";
interface AnnouncementItemProps {
  label: string;
  tag: { text: string; color: 'blue' | 'red' | 'green' | 'yellow' };
}

const AnnouncementItem: React.FC<AnnouncementItemProps> = ({ label, tag }) => {
  return (
    <div className="flex items-center justify-between text-sm px-4 py-2 hover:bg-gray-50">
      <div className="flex items-center gap-2">
        <Tag label={tag.text} color={tag.color} />
        <span className="truncate max-w-[180px]">{label}</span>
      </div>
      <div className="flex gap-3 text-gray-500">
        <FiEye className="cursor-pointer" />
        <FiEdit2 className="cursor-pointer" />
      </div>
    </div>
  );
};

export default AnnouncementItem;
