import React, { useRef } from 'react';

interface FileUploadProps {
  label: string;
  name: string;
  onFileSelect: (file: File) => void;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, name, onFileSelect, error }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition" onClick={handleFileClick}>
      <input
        type="file"
        name={name}
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-center">
        <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0l-3 3m3-3l3 3m-6 6h6" />
        </svg>
        <p className="text-gray-600 font-medium">{label}</p>
        <p className="text-sm text-gray-400">Click to upload or drag and drop</p>
        <p className="text-xs text-gray-400 mt-1">Max file size: 15KB</p>
      </div>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};

export default FileUpload;
