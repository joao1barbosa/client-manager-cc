'use client'
import { Client } from "@/@types";
import { MyButton } from "../ui/my-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Ellipsis } from "lucide-react";
import { Label } from "../ui/label";
import { OptionButtons } from "../option-buttons";

interface InfosDialogProps{
    client: Client
}

export function InfosDialog({client}: InfosDialogProps){
    const labelStyle = 'flex items-center justify-end text-right font-bold'
    const contentStyle = 'flex justify-center'

    return(
        <Dialog>
            <DialogTrigger asChild>
                <MyButton icon={<Ellipsis/>} size='h-[30px] w-[30px]'/>
            </DialogTrigger>
            <DialogContent className="dialog">
                <DialogHeader>
                <DialogTitle className="font-bold">{client.nome + " "+ client.sobrenome}</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-[1fr_4fr] gap-4 pt-4">
                    <Label className={labelStyle}>Email: </Label>
                    <p className={contentStyle}>{client.email}</p>
                    <Label className={labelStyle}>Data de Nascimento<p>&nbsp;:</p> </Label>
                    <p className={contentStyle}>{client.aniversario}</p>
                    <Label className={labelStyle}>Telefone: </Label>
                    <p className={contentStyle}>{client.telefone}</p>
                    <Label className={labelStyle}>Opções: </Label>
                    <p className={contentStyle}><OptionButtons uuid={client.uuid}/></p>
                </div>
            </DialogContent>
        </Dialog>
    );
}