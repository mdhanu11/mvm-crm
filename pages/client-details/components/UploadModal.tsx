// components/modals/UploadModal.tsx
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { HiOutlineX, HiOutlineChevronDown } from "react-icons/hi";
import { FaRegFilePdf } from "react-icons/fa";
import Button from "../../../components/ui/Button";

type UploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [fileName, setFileName] = useState("Appointment Letter");
  const [fileSize, setFileSize] = useState(10); // KB
  const maxSize = 25; // KB
  const maxAllowedSize = 15; // KB limit message
  const [category, setCategory] = useState("Select Category");

  useEffect(() => {
    setFileName("Appointment Letter");
    setFileSize(10);
    setCategory("Select Category")
  }, [])
  
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen bg-black/30 px-4">
        <Dialog.Panel className="bg-white rounded-md p-6 w-full max-w-lg shadow-xl space-y-4">
          <Dialog.Title className="text-lg font-semibold">Upload Documents</Dialog.Title>

          {/* Drop Zone */}
          <div className="border border-dashed border-gray-300 p-6 rounded-md text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-indigo-900 text-white p-2 rounded-full">
                <svg width="24" height="24" fill="currentColor" className="mx-auto">
                  <path d="M12 2a1 1 0 0 1 1 1v10.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5A1 1 0 0 1 7.707 10.293L11 13.586V3a1 1 0 0 1 1-1z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Drag a file here or <span className="text-indigo-600 cursor-pointer">Click to upload</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">Max. size limit - {maxAllowedSize} KB</p>
          </div>

          {/* File Info */}
          <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50">
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
              <p className="text-xs text-gray-500 mt-1">
                {fileSize} KB of {maxSize} KB
              </p>
            </div>
            <button onClick={onClose}>
              <HiOutlineX className="text-gray-400 hover:text-red-500" />
            </button>
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center justify-between gap-2">
            <button
              className="border px-4 py-2 rounded-md text-sm text-gray-600 flex items-center justify-between w-full max-w-xs"
            >
              {category}
              <HiOutlineChevronDown />
            </button>
            <Button variant="black">
              Save
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default UploadModal;
