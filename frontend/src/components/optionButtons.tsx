import { MyButton } from "./ui/myButton";
import { MapPin, CreditCard, Pencil } from 'lucide-react';
import { DeleteDialog } from "./dialogs/deleteDialog";

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
            <DeleteDialog size={buttonSize}/>
        </div>
    );
}