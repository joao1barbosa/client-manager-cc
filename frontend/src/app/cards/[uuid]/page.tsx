"use client"

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getClient } from '@/services/clients';
import { handleClick } from '@/utils/hadleClick';
import AddCardModal from '@/components/Card/AddCardModal';
import ClientCards from '@/components/Card/ClientCards';

export default function Cards() {
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState<boolean>(false);
  const [modalKey, setModalKey] = useState<number>(0); // State para controlar a renderização do modal
  const router = useRouter();
  const params = useParams();

  const { uuid } = params as { uuid: string };

  const fetchClientData = async () => {
    const client = await getClient(uuid);
    if (client.length === 0) {
      router.push('/');
    }
  }

  useEffect(() => {
    fetchClientData();
  }, [uuid]);

  const handleModalClose = () => {
    setIsAddCardModalOpen(false);
    setModalKey(prevKey => prevKey + 1); // Incrementa a chave para forçar a atualização do modal
  };

  return (
    <>
      <ClientCards key={modalKey} uuid={uuid} setModal={() => handleClick(setIsAddCardModalOpen, true)} />
      <AddCardModal uuid={uuid} isOpen={isAddCardModalOpen} onClose={handleModalClose} />
    </>
  );
}
