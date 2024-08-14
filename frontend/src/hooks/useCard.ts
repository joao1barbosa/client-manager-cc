import { Card } from "@/@types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  const createReq = async (data: Omit<Card, 'uuid'>): Promise<Card> => {
    const response = await axios.post<Card>('http://localhost:8000/api/cards', data);
    return response.data;
  };

  return useMutation<Card, Error, Omit<Card, 'uuid'>>({
    mutationFn: createReq,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-cards'],
        exact: true
      });
    },
  });
}

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