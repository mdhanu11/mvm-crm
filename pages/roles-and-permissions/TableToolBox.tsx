import { BiSortAlt2 } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";
import { HiSearch } from "react-icons/hi";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function TableToolBar() {
    return (
        <div className="flex flex-wrap items-center gap-3 w-full">
            
            
            <div className="flex-1 min-w-[250px]">
                <Input
                    iconStart={<HiSearch size={18} />}
                    placeholder="Search staff"
                    inputSize="md"
                />
            </div>

            {/* Sort Button */}
            <Button variant="outline" size="md" iconStart={<BiSortAlt2 size={16} />}>
                Sort by
            </Button>

            {/* Filter Button */}
            <Button variant="outline" size="md" iconStart={<CiFilter size={16} />}>
                Filter
            </Button>
        </div>
    );
}
