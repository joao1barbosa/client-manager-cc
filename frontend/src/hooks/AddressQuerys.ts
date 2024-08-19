import { Address } from '@/@types';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useReadAddress = (uuid: string) => {
    return useQuery<Address>({
        queryKey:['get-address', uuid],
        queryFn: async() => {
          const response = await fetch(`http://localhost:8000/api/addresses/${uuid}`);
          const data = await response.json();
        
          return data;
        },
        placeholderData: keepPreviousData
      });
    }


export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  const updateAddressReq = async (data: Address & { client_uuid: string }): Promise<Address> => {
    const { client_uuid, ...addressData } = data;
    const response = await axios.put<Address>(`http://localhost:8000/api/addresses/${client_uuid}`, addressData);
    return response.data;
  };

  return useMutation<Address, Error, Address & { client_uuid: string }>({
    mutationFn: updateAddressReq,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-address'],
        exact: true,
      });
    },
  });
};