'use client'
import { MyButton } from "../ui/my-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { EditClientForm } from "../forms/edit-client-form";

export function EditClientDialog(){
    return(
        <Dialog>
            <DialogTrigger asChild>
                <MyButton icon={<Pencil/>} size='h-[30px] w-[30px]'/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dialog">
                <DialogHeader>
                <DialogTitle>Editar Cliente</DialogTitle>
                </DialogHeader>

                <EditClientForm/>
            </DialogContent>
        </Dialog>
    );
}