import axios from 'axios';
import backend_url from './backend';

const fullUrl = `${backend_url}/addresses`;

export const createAddress = async (addressData: any) => {
  const response = await axios.post(fullUrl, addressData);
  return response.data;
};

export const getAddress = async (uuid: string) => {
  const response = await axios.get(fullUrl+"/"+uuid);
  return response.data;
};

export const updateAddress = async (uuid: string, addressData: any) => {
  const response = await axios.put(fullUrl+"/"+uuid, addressData);
  return response.data;
};
