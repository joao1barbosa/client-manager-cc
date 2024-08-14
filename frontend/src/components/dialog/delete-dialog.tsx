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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Client } from "@/@types";
import axios from "axios";


interface DeleteDialogProps{
  button: React.ReactNode;
  to: 'client' | 'card';
  uuid: string
}

const deleteClient = async (clientUuid: string): Promise<Client> => {
  const response = await axios.delete<Client>(`http://localhost:8000/api/clients/${clientUuid}`);
  return response.data;
};
  
export function DeleteDialog({ button, to, uuid }: DeleteDialogProps) {
  const queryClient = useQueryClient();
  
  const mutation = useMutation<Client, Error, string>({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-clients'],
        exact: true,
      });
    },
  });

  const handleDelete = () => mutation.mutate(uuid);

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
            <AlertDialogAction onClick={handleDelete}
              className="bg-red-700 hover:bg-red-950 text-white"
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
}
  