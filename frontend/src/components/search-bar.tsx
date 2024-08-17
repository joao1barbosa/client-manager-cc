import { useState } from 'react';
import { Search } from 'lucide-react';
import { MyButton } from './ui/my-button';
import { Input } from './ui/input';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
  }

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [isActive, setIsActive] = useState(false);
    const [term, setTerm] = useState('');

    const handleOnClick = () => {
        isActive ? onSearch(term) : setIsActive(true);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') onSearch(term);
    };    

    return (
        <div className="flex items-center relative">
            <Input
                type="text" 
                placeholder="Pesquisar por Nome" 
                className= {
                    `transition-all duration-300 ease-in-out border border-gray-300 z-10
                    rounded-md p-1.5 mr-2 ${isActive ? 'w-48 opacity-100' : 'w-0 opacity-0'}`
                }
                onBlur={() => setIsActive(false)}
                autoFocus={isActive}
                onChange={(e) => setTerm(e.target.value)}
                onKeyDown={handleKeyDown} 
            />

            <MyButton icon={<Search/>} onClick={handleOnClick} size={'z-20'}/>
        </div>
    );
}