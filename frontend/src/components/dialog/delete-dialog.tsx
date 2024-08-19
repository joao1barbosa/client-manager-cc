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
import { useDeleteClient } from "@/hooks/ClientQuerys";
import { useDeleteCard } from "@/hooks/CardQuerys";
import { useRefetch } from "@/hooks/useRefetch";

interface DeleteDialogProps{
  button: React.ReactNode;
  to: 'client' | 'card';
  uuid: string
}

export function DeleteDialog({ button, to, uuid }: DeleteDialogProps) {
  const { mutate: clientMutate } = useDeleteClient();
  const { mutate: cardMutate } = useDeleteCard();
  const { refetch } = useRefetch();

  const handleClientDelete = () => {
    clientMutate(uuid,{
      onSuccess: () => {if (refetch) refetch()}
    });
  };
  const handleCardDelete = () => {
    cardMutate(uuid, {
      onSuccess: () => {if (refetch) refetch()}
    });
  };

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
            <AlertDialogAction onClick={()=>{
              (to === 'client') ?
                handleClientDelete()
              :
                handleCardDelete()
            }
            }
              className="bg-red-700 hover:bg-red-950 text-white"
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
}
  