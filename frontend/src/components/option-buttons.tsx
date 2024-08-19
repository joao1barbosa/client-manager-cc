import { MyButton } from "./ui/my-button";
import {  CreditCard, Trash } from 'lucide-react';
import { DeleteDialog } from "./dialog/delete-dialog";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { AddressDialog } from "./dialog/address-dialog";
import { EditClientDialog } from "./dialog/edit-client-dialog";
import { ClientUuidProvider } from "@/contexts/client-uuid-context";

interface OptionButtonsProps{
    uuid: string;
}

export function OptionButtons ({ uuid }: OptionButtonsProps) {
    const buttonConvert = buttonVariants({ variant: "outline" }).replace('h-10 px-4 py-2', '');
    const buttonSize = 'h-[30px] w-[30px]';

    return (
        <div className="flex flex-row justify-center space-x-1.5">
            <ClientUuidProvider uuid={uuid}>
                <AddressDialog/>
                <Link href={`/${uuid}/cards`} className={buttonSize + ' my-button ' + buttonConvert}>
                    <CreditCard/>
                </Link>
                <EditClientDialog/>
                <DeleteDialog to='client' uuid={uuid} button={
                    <MyButton 
                        icon={<Trash/>}
                        size={buttonSize}
                    />
                }
                />
            </ClientUuidProvider>
        </div>
    );
}