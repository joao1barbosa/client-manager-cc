'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CirclePlus } from 'lucide-react';

export function AddCardDialog(){
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button size='sm'
                    className='flex flex-row space-x-2 my-0 items-center justify-center' 
                >
                    <CirclePlus/>
                    <p>Adicionar Cartão</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dialog">
                <DialogHeader>
                <DialogTitle>Adicionar Cartão</DialogTitle>
                </DialogHeader>

                <p>aaaaaaaaaaaaaaaaaa</p>
            </DialogContent>
        </Dialog>
    );
}