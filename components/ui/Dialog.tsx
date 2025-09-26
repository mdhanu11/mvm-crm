// components/ui/Dialog.tsx
import { ReactNode, useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: string;
};

export default function Dialog({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg",
}: DialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 w-full h-screen px-4">
      <div
        className={`relative w-full ${maxWidth} bg-white rounded-lg shadow-lg p-6 space-y-4`}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close dialog"
        >
          <RxCrossCircled size={24} />
        </button>

        {/* Title */}
        {title && (
          <h2 className="text-lg font-semibold text-gray-900 pr-10">{title}</h2>
        )}

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
