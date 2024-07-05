"use client"

import { useParams } from 'next/navigation';
import { useState } from 'react';
import AddCardModal from '@/components/Modals/AddCardModal';
import { handleClick } from '@/utils/haddleClick';

export default function Cards() {
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState<boolean>(false);

  const params = useParams();
  const { uuid } = params as { uuid: string };

  const cards = [
    //index no bd
  ];

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
            <h1>Tem</h1>
        }
      </div>
      <AddCardModal isOpen={isAddCardModalOpen} onClose={() => handleClick(setIsAddCardModalOpen, false)}/>
    </>
  );
}