"use client"

import { useParams } from 'next/navigation';
import { useState } from 'react';
import AddCardModal from '@/components/Modals/Card/AddCardModal';
import { handleClick } from '@/utils/hadleClick';
import CardBlock from '@/components/CardBlock';

export default function Cards() {
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState<boolean>(false);
  const [cards, setCards] = useState([
    {
      expiry: "12/12",
      name: "Joao Barbosa",
      number: "4434 1234 1234 4321"
    }
  ]);

  const params = useParams();
  const { uuid } = params as { uuid: string };

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
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => handleClick(setIsAddCardModalOpen, true)}
              >
                Adicionar Cartão
              </button>
            </div>
          :
            <div className='flex flex-col h-full w-full'>
              <section className='flex flex-row justify-end'>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={() => handleClick(setIsAddCardModalOpen, true)}
                >
                  Adicionar Cartão
                </button>
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
      <AddCardModal isOpen={isAddCardModalOpen} onClose={() => handleClick(setIsAddCardModalOpen, false)}/>
    </>
  );
}
