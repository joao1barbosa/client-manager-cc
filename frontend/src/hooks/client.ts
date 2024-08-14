import { ClientResponse, Client } from "@/@types";
import { useQuery, keepPreviousData, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useReadClients = (currentPage: number, perPage: number) => {
    return useQuery<ClientResponse>({
        queryKey:['get-clients', currentPage, perPage],
        queryFn: async() => {
          const response = await fetch(`http://localhost:8000/api/clients?per_page=${perPage}&page=${currentPage}`);
          const data = await response.json();
    
          return data;
        },
        placeholderData: keepPreviousData
    });
}

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  const deleteReq = async (clientUuid: string): Promise<Client> => {
    const response = await axios.delete<Client>(`http://localhost:8000/api/clients/${clientUuid}`);
    return response.data;
  };

  return useMutation<Client, Error, string>({
    mutationFn: deleteReq,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-clients'],
        exact: true,
      });
    },
  });
}