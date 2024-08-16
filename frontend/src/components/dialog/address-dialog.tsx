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

export function AddressDialog(){
    return(
        <Dialog>
            <DialogTrigger asChild>
                <MyButton icon={<MapPin/>} size='h-[30px] w-[30px]'/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dialog">
                <DialogHeader>
                <DialogTitle>Endereço</DialogTitle>
                </DialogHeader>

                aaaaaaaaaaaa
            </DialogContent>
        </Dialog>
    );
}