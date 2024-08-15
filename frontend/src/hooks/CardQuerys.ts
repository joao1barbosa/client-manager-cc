import { Card, CardResponse } from "@/@types";
import { useQueryClient, useMutation, keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCreateCard = () => {
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

export const useReadCards = (client_uuid: string) => {
  return useQuery<CardResponse>({
    queryKey:['get-cards'],
    queryFn: async() => {
      const response = await fetch(`http://localhost:8000/api/clients/${client_uuid}/cards`);
      const data = await response.json();
    
      return data;
    },
    placeholderData: keepPreviousData
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