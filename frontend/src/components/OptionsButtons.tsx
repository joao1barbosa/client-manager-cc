import { FaTrash, FaPen, FaCreditCard } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";

interface Props{
    onDeleteClick: () => void;
    onEditClick: () => void;
    onAddressClick: () => void;
    uuid: string
}

export default function OptionsButtons({ onDeleteClick, onEditClick, onAddressClick, uuid }: Props){
    return(
        <div className="flex flex-row justify-center space-x-1 mr-0">
            <button 
                className="flex justify-center items-center w-8 h-8 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={onAddressClick}
            >
                <FaLocationDot className="text-white" />
            </button>
            <Link href={`/cards/${uuid}`}>
                <div className="flex justify-center items-center w-8 h-8 bg-gray-300 rounded-md hover:bg-gray-400">
                    <FaCreditCard className="text-white" />
                </div>
            </Link>
            <button 
                className="flex justify-center items-center w-8 h-8 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={onEditClick}
            >
                <FaPen className="text-white" />
            </button>
            <button 
                className="flex justify-center items-center w-8 h-8 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={onDeleteClick}
            >
                <FaTrash className="text-white" />
            </button>
        </div>
    );
}