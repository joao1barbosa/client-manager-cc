import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MyButton } from "../ui/my-button";
import { Trash } from "lucide-react";

interface DeleteDialogProps{
    size: string;
}
  
export function DeleteDialog({size}: DeleteDialogProps) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
            <MyButton 
                icon={<Trash/>}
                size={size}
            />
        </AlertDialogTrigger>
        <AlertDialogContent className="dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
                Essa ação não pode ser desfeita. Isso apagará permanetemente o
                registro do cliente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-red-700 hover:bg-red-950 text-white">Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  