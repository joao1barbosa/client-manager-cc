'use client'
import { MyButton } from "../ui/my-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { AddClientForm } from '../forms/add-client-form';

export function AddClientDialog(){
    return(
        <Dialog>
            <DialogTrigger asChild>
                <MyButton icon={<Plus/>}/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[360px] dialog">
                <DialogHeader>
                <DialogTitle>Adicionar Cliente</DialogTitle>
                </DialogHeader>

                <AddClientForm/>
            </DialogContent>
        </Dialog>
    );
}