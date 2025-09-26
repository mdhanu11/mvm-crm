import { HiSearch } from "react-icons/hi";
import { BiSortAlt2 } from "react-icons/bi";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";
import { CiFilter } from "react-icons/ci";

export default function TableToolBar() {
    return (
        <div className="flex flex-wrap items-center gap-3 w-full">
            
            
            <div className="flex-1 min-w-[250px]">
                <Input
                    iconStart={<HiSearch size={18} />}
                    placeholder="Search employee by name, email"
                    inputSize="md"
                />
            </div>

            <Select defaultValue="">
                <option value="">Department</option>
                <option value="hr">HR</option>
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
            </Select>

            <Select defaultValue="">
                <option value="">Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="sabbatical">Sabbatical</option>
            </Select>

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
