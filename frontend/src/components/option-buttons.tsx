import { MyButton } from "./ui/my-button";
import {  CreditCard, Pencil, Trash } from 'lucide-react';
import { DeleteDialog } from "./dialog/delete-dialog";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { AddressDialog } from "./dialog/address-dialog";
import { EditClientDialog } from "./dialog/edit-client-dialog";

interface OptionButtonsProps{
    uuid: string;
}

export function OptionButtons ({ uuid }: OptionButtonsProps) {
    const buttonConvert = buttonVariants({ variant: "outline" }).replace('h-10 px-4 py-2', '');
    const buttonSize = 'h-[30px] w-[30px]';

    return (
        <div className="flex flex-row justify-center space-x-1.5">
            <AddressDialog
                uuid={uuid}
            />
            <Link href={`/${uuid}/cards`} className={buttonSize + ' my-button ' + buttonConvert}>
                <CreditCard/>
            </Link>
            {/* <MyButton
                icon={<Pencil/>}
                size={buttonSize}    
            /> */}
            <EditClientDialog/>
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