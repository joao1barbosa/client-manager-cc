import { FaPlus } from "react-icons/fa"
import SearchBar from "../SearchBar";

interface Props {
    onAddClick: () => void;
  }

export default function ClientesButtons({onAddClick}: Props){
    return(
        <div className="flex flex-row space-x-3">
            <SearchBar/>
            <button 
                className="flex justify-center items-center w-10 h-10 bg-gray-500 rounded-md hover:bg-gray-600"
                onClick={onAddClick}
            >
                <FaPlus className="text-white" />
            </button>
        </div>
    );
}