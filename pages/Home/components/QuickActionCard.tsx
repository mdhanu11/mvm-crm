import React from 'react';
interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick?: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, title, subtitle, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition flex-col justify-center items-center text-center"
      onClick={onClick}
    >
      {icon}
      <h6 className='font-semibold mt-2 mb-1'>{title}</h6>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
};

export default QuickAction;
