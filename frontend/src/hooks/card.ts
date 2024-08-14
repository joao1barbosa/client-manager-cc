import { Card } from "@/@types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteCard = () => {
    const queryClient = useQueryClient();
  
    const deleteReq = async (cardUuid: string): Promise<Card> => {
      const response = await axios.delete<Card>(`http://localhost:8000/api/cards/${cardUuid}`);
      return response.data;
    };
  
    return useMutation<Card, Error, string>({
      mutationFn: deleteReq,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['get-cards'],
          exact: true,
        });
      },
    });
  }