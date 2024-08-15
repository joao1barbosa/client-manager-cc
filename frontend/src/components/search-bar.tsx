import { useState } from 'react';
import { Search } from 'lucide-react';
import { MyButton } from './ui/my-button';
import { Input } from './ui/input';

export default function SearchBar() {
    const [isActive, setIsActive] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setSearch(event.target.value);
    }

    const handleOnClick = () => {
        isActive ? console.log("Faz Pesquisa") : setIsActive(true);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          console.log('Enter pressionado!');
        }
    };    

    return (
        <div className="flex items-center">
            <Input
                type="text" 
                placeholder="Pesquisar..." 
                className= {
                    `transition-all duration-300 ease-in-out border border-gray-300 
                    rounded-md p-1.5 mr-2 ${isActive ? 'w-48 opacity-100' : 'w-0 opacity-0'}`
                }
                onBlur={() => setIsActive(false)}
                autoFocus={isActive}
                onKeyDown={handleKeyDown} 
            />

            <MyButton icon={<Search/>} onClick={handleOnClick}/>
        </div>
    );
}