import { ClientResponse, Client } from "@/@types";
import { useQuery, keepPreviousData, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  const createReq = async (data: Omit<Client, 'uuid'>): Promise<Client> => {
    const response = await axios.post<Client>('http://localhost:8000/api/clients', data);
    return response.data;
  };

  return useMutation<Client, Error, Omit<Client, 'uuid'>>({
    mutationFn: createReq,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-clients'],
        exact: true
      });
    },
  });
}

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

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  const updateReq = async (data: Partial<Client> & { uuid: string }): Promise<Client> => {
    const { uuid, ...rest } = data;
    const response = await axios.put<Client>(`http://localhost:8000/api/clients/${uuid}`, rest);
    return response.data;
  };

  return useMutation<Client, Error, Partial<Client> & { uuid: string }>({
    mutationFn: updateReq,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-clients'],
        exact: true,
      });
    },
  });
};

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