import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import { HiPlus } from "react-icons/hi";
import Button from "../../../components/ui/Button";

const notes = [
  {
    text: "Jerome has been working and leading on PV-21 project and has been recommend Lead position for next increment by Mary",
    date: "15/04/2025",
    type: "positive",
  },
  {
    text: "Jerome has been caught smoking in the premises, complaint has been raised.",
    date: "05/01/2025",
    type: "negative",
  },
  {
    text: "Performance appreciated",
    date: "05/01/2025",
    type: "positive",
  },
  {
    text: "Jerome has been away for 3 days without informing either client or agency",
    date: "05/01/2025",
    type: "negative",
  },
  {
    text: "Jerome has been away for 3 days without informing either client or agency",
    date: "05/01/2025",
    type: "negative",
  },
];

export default function DetailsTab() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-2">
      {/* Left side */}
      <div className="flex-1 space-y-4">
        {/* Employment Details */}
        <div className="bg-white shadow-sm p-4 rounded-lg">
          <h3 className="font-semibold mb-4">Employment Details</h3>
          <div className="grid grid-cols-2 text-sm gap-y-3">
            <div><span className="text-gray-500 font-normal">Client</span><div>Invision Pvt. Ltd</div></div>
            <div><span className="text-gray-500 font-normal">Location</span><div>Melbourne, Australia</div></div>
            <div><span className="text-gray-500 font-normal">Employment Type</span><div>Contract</div></div>
            <div><span className="text-gray-500 font-normal">Mode</span><div>Hybrid</div></div>
            <div className="col-span-2"><span className="text-gray-500 font-normal">Reporting to</span><div>Mary Houston - COO</div></div>
          </div>
        </div>

        {/* Contract Details */}
        <div className="bg-white shadow-sm p-4 rounded-lg">
          <h3 className="font-semibold mb-4">Contract Details</h3>
          <div className="grid grid-cols-2 text-sm gap-y-3">
            <div><span className="text-gray-500 font-normal">Started working on</span><div>12/05/2023</div></div>
            <div><span className="text-gray-500 font-normal">Contract starting Date</span><div>12/05/2024</div></div>
            <div><span className="text-gray-500 font-normal">Contract End Date</span><div>12/05/2025</div></div>
            <div><span className="text-gray-500 font-normal">Increment Date</span><div>12/05/2025</div></div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white shadow-sm p-4 rounded-lg">
          <h3 className="font-semibold mb-4">Payment Details</h3>
          <div className="grid grid-cols-2 text-sm gap-y-3">
            <div><span className="text-gray-500 font-normal">Salary (per month)</span><div>$5500</div></div>
            <div><span className="text-gray-500 font-normal">Monthly Payment Date</span><div>7th</div></div>
            <div><span className="text-gray-500 font-normal">Invoice cycle ends</span><div>Last day of the month</div></div>
            <div><span className="text-gray-500 font-normal">Last Increment</span><div>15%</div></div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="w-full lg:w-80 flex flex-col gap-4 bg-white shadow-sm p-4 rounded-lg ">
        <div className="flex-1 flex flex-col max-h-[500px] overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Notes</h3>
            <HiOutlineEllipsisHorizontal className="w-5 h-5 text-gray-500" />
          </div>
          <div className="overflow-y-auto space-y-3  pr-2">
            {notes.map((note, idx) => (
              <div
                key={idx}
                className={`text-sm p-3 rounded-md ${note.type === "positive"
                    ? "bg-green-100 text-green-900"
                    : "bg-red-100 text-red-900"
                  }`}
              >
                <p>{note.text}</p>
                <p className="text-xs mt-2">{note.date}</p>
              </div>
            ))}
          </div>
        </div>
        <Button variant="outline" iconStart={<HiPlus />}>
          Add notes
        </Button>
      </div>
    </div>
  );
}
