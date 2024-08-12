import { MyButton } from "./ui/myButton";
import { MapPin, CreditCard, Pencil, Trash } from 'lucide-react';

interface OptionButtonsProps{
    uuid: string;
}

export function OptionButtons ({ uuid }: OptionButtonsProps) {
    const buttonSize = 'h-[30px] w-[30px]';

    return (
        <div className="flex flex-row justify-center space-x-1.5">
            <MyButton 
                icon={<MapPin/>}
                size={buttonSize}
            />
            <MyButton 
                icon={<CreditCard/>}
                size={buttonSize}
            />
            <MyButton
                icon={<Pencil/>}
                size={buttonSize}    
            />
            <MyButton 
                icon={<Trash/>}
                size={buttonSize}
            />
        </div>
    );
}