import axios from 'axios';
import backend_url from './backend';

const fullUrl = `${backend_url}/clients`;

export const getClients = async () => {
  const response = await axios.get(fullUrl);
  return response.data;
};

export const createClient = async (clientData: any) => {
  const response = await axios.post(fullUrl, clientData);
  return response.data;
};

export const updateClient = async (uuid: string, clientData: any) => {
  const response = await axios.put(fullUrl+"/"+uuid, clientData);
  return response.data;
};

export const deleteClient = async (uuid: string) => {
  const response = await axios.delete(fullUrl+"/"+uuid);
  return response.data;
};