import { useState } from 'react';
import { Search } from 'lucide-react';
import { MyButton } from './ui/my-button';

export default function SearchBar() {
  const [isActive, setIsActive] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setSearch(event.target.value);
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
        <MyButton icon={<Search/>}/>
    </div>
  );
}