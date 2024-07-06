"use client"

import { useParams } from 'next/navigation';
import { useState } from 'react';
import AddCardModal from '@/components/Modals/Card/AddCardModal';
import { handleClick } from '@/utils/haddleClick';
import CardBlock from '@/components/CardBlock';

export default function Cards() {
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState<boolean>(false);

  const params = useParams();
  const { uuid } = params as { uuid: string };

  const cards = [
    "111111"
  ];

  const card = {
    expiry: "12/12",
    name: "Joao Barbosa",
    number: "4434 1234 1234 4321"
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
            <section className='w-full h-full flex flex-row flex-wrap overflow-y-auto justify-center'>
              <CardBlock card={card}/>
              <CardBlock card={card}/>
              <CardBlock card={card}/>
              <CardBlock card={card}/>
              <CardBlock card={card}/>
            </section>
        }
      </div>
      <AddCardModal isOpen={isAddCardModalOpen} onClose={() => handleClick(setIsAddCardModalOpen, false)}/>
    </>
  );
}