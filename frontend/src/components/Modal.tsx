import { ReactNode } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode
}

export default function Modal({ isOpen, onClose, children }: Props) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 relative">
          <button
            className="absolute top-1 right-2 text-gray-500"
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    );
  }