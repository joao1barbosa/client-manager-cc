import { FaTrash, FaPen, FaCreditCard } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

interface Props{
    onDeleteClick: () => void;
}

export default function OptionsButtons({ onDeleteClick }: Props){
    return(
        <div className="flex flex-row justify-center space-x-1 mr-0">
            <button className="flex justify-center items-center w-8 h-8 bg-gray-300 rounded-md">
                <FaLocationDot className="text-white" />
            </button>
            <button className="flex justify-center items-center w-8 h-8 bg-gray-300 rounded-md">
                <FaCreditCard className="text-white" />
            </button>
            <button className="flex justify-center items-center w-8 h-8 bg-gray-300 rounded-md">
                <FaPen className="text-white" />
            </button>
            <button 
                className="flex justify-center items-center w-8 h-8 bg-gray-300 rounded-md"
                onClick={onDeleteClick}
            >
                <FaTrash className="text-white" />
            </button>
        </div>
    );
}