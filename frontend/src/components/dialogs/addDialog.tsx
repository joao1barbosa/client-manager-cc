'use client'
import { MyButton } from "../ui/myButton";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";

export function AddDialog(){
    const [alert, setAlert] = useState<string>('');

    return(
        <Dialog>
            <DialogTrigger asChild>
                <MyButton icon={<Plus/>}/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dialog">
                <DialogHeader>
                <DialogTitle>Adicionar Cliente</DialogTitle>
                <DialogDescription className="text-red-700">
                    {alert}
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                    Name
                    </Label>
                    <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                    Username
                    </Label>
                    <Input
                    id="username"
                    defaultValue="@peduarte"
                    className="col-span-3"
                    />
                </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type='button' variant='outline'>
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}