// components/Tabs.tsx
import React from 'react';
import { classNames } from '../../utils/classNames';

export type TabItem = {
  label: string;
  value: string;
};

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (value: string) => void;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  underline?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = '',
  tabClassName = '',
  activeTabClassName = '',
  underline = true,
}) => {
  return (
    <div className={classNames('flex space-x-6 text-sm font-medium', className)}>
      {tabs.map((tab) => {
        const isActive = tab.value === activeTab;

        return (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={classNames(
              'pb-1 transition-colors duration-200',
              tabClassName,
              isActive
                ? classNames(
                    'text-blue-600',
                    underline && 'border-b-2 border-blue-600',
                    activeTabClassName
                  )
                : 'text-gray-500 hover:text-blue-600'
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
