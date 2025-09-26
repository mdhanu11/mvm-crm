import React from 'react';
import Button from '../../../components/ui/Button';
import type { ButtonVariantTypes } from '../../../types/Button.type';

interface ActionCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    buttonLabel: string;
    onClick?: () => void;
    buttonType?: ButtonVariantTypes
}

const ActionCard: React.FC<ActionCardProps> = ({ icon, title, description, buttonLabel, onClick, buttonType = "black" }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex  gap-2 text-sm font-medium">
                {icon}
                <div>

                    <div className='mb-3'>
                        <span>{title}</span>
                        <p className="text-sm text-gray-500 mt-1">{description}</p>
                    </div>
                    <Button variant={buttonType} size="sm" onClick={onClick}>
                        {buttonLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ActionCard;
