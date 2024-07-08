import axios from 'axios';
import backend_url from './backend';

const fullUrl = `${backend_url}/cards`;

export const createCard = async (cardData: any) => {
    const response = await axios.post(fullUrl, cardData);
    return response.data;
};

export const getClientCards = async (uuid: string) => {
  try {
    const response = await axios.get(`${fullUrl}/${uuid}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      throw error;
    }
  }
};

export const deleteCard = async (numero: string) => {
  const response = await axios.delete(fullUrl+"/"+numero);
  return response.data;
};