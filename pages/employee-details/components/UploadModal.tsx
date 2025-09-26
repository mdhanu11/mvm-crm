// components/modals/UploadModal.tsx
import { useEffect, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import Button from "../../../components/ui/Button";
import Dialog from "../../../components/ui/Dialog";
import Select from "../../../components/ui/Select";
import UploadIcon from '../../../assets/icons/upload.svg'
import { RxCrossCircled } from "react-icons/rx";

type UploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [fileName, setFileName] = useState("Appointment Letter");
  const [fileSize, setFileSize] = useState(10); // KB
  const maxSize = 25; // KB
  const maxAllowedSize = 15; // KB limit message
  

  useEffect(() => {
    setFileName("Appointment Letter");
    setFileSize(10);
  }, [])

  return (
    <Dialog maxWidth="max-w-3xl" isOpen={isOpen} onClose={onClose}>
      <div className="space-y-3">
        <h5 className="text-lg font-semibold">Upload Documents</h5>

        {/* Drop Zone */}
        <div className="border border-dashed border-gray-300 p-6 rounded-md text-center">
          <div className="flex justify-center mb-2">
            
            <img src={UploadIcon} width={80} height={80} alt="Upload Icon" />
          </div>
          <p className="text-sm text-gray-600">
            Drag a file here or <span className="text-indigo-600 cursor-pointer">Click to upload</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">Max. size limit - {maxAllowedSize} KB</p>
        </div>

        <div className="flex gap-3">


          {/* File Info */}
          <div className="flex-1 flex items-center justify-between border p-2 py-1 rounded-md bg-gray-50">
            <div className="flex items-center gap-2">
              <FaRegFilePdf className="text-red-500 text-xl" />
              <span className="text-sm">{fileName}</span>
            </div>
            <div className="flex-1 mx-4">
              <div className="h-1 bg-gray-200 rounded-full relative">
                <div
                  className="bg-indigo-600 h-1 rounded-full"
                  style={{ width: `${(fileSize / maxSize) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-gray-500 mt-1">
                {fileSize} KB of {maxSize} KB
              </p>
            </div>
            <button onClick={onClose}>
              <RxCrossCircled className="text-gray-400 hover:text-red-500" />
            </button>
          </div>

          {/* Category Dropdown */}
          <Select selectSize="md">
            <option value="">Select Category</option>
          </Select>
        </div>
        <div className="text-end">
          <Button variant="black">
            Save
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default UploadModal;
