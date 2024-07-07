"use client"

import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useSearch } from '@/hooks/useSearch';

export default function SearchBar() {
  const [isActive, setIsActive] = useState(false);
  const { setSearch } = useSearch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
}

  return (
    <div className="flex items-center">
        <input 
            type="text" 
            placeholder="Pesquisar..." 
            className= {
                `transition-all duration-300 ease-in-out border border-gray-300 
                rounded-md p-1.5 mr-2 ${isActive ? 'w-64 opacity-100' : 'w-0 opacity-0'}`
            }
            onBlur={() => setIsActive(false)}
            autoFocus={isActive}
            onChange={handleInputChange}
        />
        <button 
            className="
            flex justify-center items-center w-10 h-10 bg-gray-500 rounded-md hover:bg-gray-600
            "
            onClick={() => setIsActive(!isActive)} 
        >
                <FaSearch className="text-white" />
        </button>
    </div>
  );
}