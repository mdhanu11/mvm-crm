import React from 'react';
import { classNames } from '../../utils/classNames';

interface TagProps {
  label: string;
  color: 'blue' | 'red' | 'green' | 'yellow';
}

const colorMap = {
  blue: 'bg-blue-100 text-blue-700',
  red: 'bg-red-100 text-red-700',
  green: 'bg-green-100 text-green-700',
  yellow: 'bg-yellow-100 text-yellow-700',
};

const Tag: React.FC<TagProps> = ({ label, color }) => {
  return (
    <span className={classNames("text-xs font-medium px-2 py-1 rounded-full", colorMap[color])}>
      {label}
    </span>
  );
};

export default Tag;
