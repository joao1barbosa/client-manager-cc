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


interface DeleteDialogProps{
  button: React.ReactNode;
  to: 'client' | 'card';
}
  
export function DeleteDialog({ button, to }: DeleteDialogProps) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
            {button}
        </AlertDialogTrigger>
        <AlertDialogContent className="dialog max-w-[41vw]">
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
                Essa ação não pode ser desfeita. Isso apagará o registo permanetemente.
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
  