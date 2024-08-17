'use client'
import { MyButton } from "../ui/my-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin } from "lucide-react";
import { AddressForm } from "../forms/address-form";

export function AddressDialog(){
    return(
        <Dialog>
            <DialogTrigger asChild>
                <MyButton icon={<MapPin/>} size='h-[30px] w-[30px]'/>
            </DialogTrigger>
            <DialogContent className="dialog">
                <DialogHeader>
                <DialogTitle>Endereço</DialogTitle>
                </DialogHeader>

                <AddressForm/>
            </DialogContent>
        </Dialog>
    );
}