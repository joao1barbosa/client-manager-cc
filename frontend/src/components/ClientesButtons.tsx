import { FaSearch, FaPlus } from "react-icons/fa"

interface Props {
    onAddClick: () => void;
  }

export default function ClientesButtons({onAddClick}: Props){
    return(
        <div className="flex flex-row space-x-3">
            <button className="flex justify-center items-center w-10 h-10 bg-gray-500 rounded-md">
                <FaSearch className="text-white" />
            </button>
            <button 
                className="flex justify-center items-center w-10 h-10 bg-gray-500 rounded-md"
                onClick={onAddClick}
            >
                <FaPlus className="text-white" />
            </button>
        </div>
    );
}