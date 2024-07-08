"use client"

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import AddCardModal from '@/components/Card/AddCardModal';
import { handleClick } from '@/utils/hadleClick';
import { getClientCards } from '@/services/cards';
import CardBlock from '@/components/Card/CardBlock';
import AddCardButton from '@/components/Card/AddCardButton';
import { redirect } from 'next/navigation';
import { getClient } from '@/services/clients';

export default function Cards() {
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState<boolean>(false);
  const [clientExists, setClientExists] = useState<boolean>(true);
  const [cards, setCards] = useState([]);

  const params = useParams();
  const { uuid } = params as { uuid: string };

  const fetchClientCards = async () => {
    try {
      const clientData = await getClient(uuid);
      if (clientData.length === 0) {
        setClientExists(false);
        return; // Early return if client doesn't exist
      }

      const cardsData = await getClientCards(uuid);
      setCards(cardsData);
    } catch (error) {
      console.error('Error fetching client or cards:', error);
      setClientExists(false);
    }
  };

  useEffect(() => {
    if (uuid) {
      fetchClientCards();
    }
  }, [isAddCardModalOpen]);

  useEffect(() => {
    if (!clientExists) redirect('/');
  }, [clientExists]);

  const handleRemoveCard = (index: number) => {
    setCards(prevCards => prevCards.filter((_, i) => i !== index));
  }

  return (
    <>
      <div className='flex flex-row h-full w-full justify-center items-center'>
        {
          cards.length === 0 ?  
            <div className='flex flex-col space-y-4'>
              <h1 className='font-semibold text-xl'>
                Nenhum Cartão de Credito Cadastrado
              </h1>
              <AddCardButton onClick={() => handleClick(setIsAddCardModalOpen, true)}/>
            </div>
          :
            <div className='flex flex-col h-full w-full'>
              <section className='flex flex-row justify-end'>
                <AddCardButton onClick={() => handleClick(setIsAddCardModalOpen, true)}/>
              </section>
              <section className='
                w-full h-full flex flex-wrap overflow-y-auto content-start justify-center
                my-2 
                '>
                {cards.map((card, index) => (
                  <CardBlock
                    key={index}
                    card={card}
                    onRemove={() => handleRemoveCard(index)}
                  />
                ))}
              </section>
            </div>
        }
      </div>
      <AddCardModal uuid ={uuid} isOpen={isAddCardModalOpen} onClose={() => handleClick(setIsAddCardModalOpen, false)}/>
    </>
  );
}
