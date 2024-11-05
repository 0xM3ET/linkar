// src/components/ui/Alert.tsx
import React from 'react';

interface AlertProps {
    type?: 'success' | 'error' | 'info' | 'warning';
    message: string;
    onClose?: () => void;
}

const alertStyles = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
};

const Alert: React.FC<AlertProps> = ({ type = 'info', message, onClose }) => {
    return (
        <div className={`flex items-center p-4 mb-4 border rounded ${alertStyles[type]}`}>
            <span className="flex-grow">{message}</span>
            {onClose && (
                <button
                    onClick={onClose}
                    className="text-lg font-bold ml-4 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                    &times;
                </button>
            )}
        </div>
    );
};

export default Alert;
