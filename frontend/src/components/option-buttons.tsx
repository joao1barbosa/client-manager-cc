import { MyButton } from "./ui/my-button";
import { MapPin, CreditCard, Pencil, Trash } from 'lucide-react';
import { DeleteDialog } from "./dialog/delete-dialog";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface OptionButtonsProps{
    uuid: string;
}

export function OptionButtons ({ uuid }: OptionButtonsProps) {
    const buttonConvert = buttonVariants({ variant: "outline" }).replace('h-10 px-4 py-2', '');
    const buttonSize = 'h-[30px] w-[30px]';

    return (
        <div className="flex flex-row justify-center space-x-1.5">
            <MyButton 
                icon={<MapPin/>}
                size={buttonSize}
            />
            <Link href={`/${uuid}/cards`} className={buttonSize + ' my-button ' + buttonConvert}>
                <CreditCard/>
            </Link>
            <MyButton
                icon={<Pencil/>}
                size={buttonSize}    
            />
            <DeleteDialog to='client' uuid={uuid} button={
                <MyButton 
                    icon={<Trash/>}
                    size={buttonSize}
                />
            }
            />
        </div>
    );
}