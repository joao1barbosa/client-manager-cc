"use client"

import { useParams } from 'next/navigation';

export default function Cards() {
  const params = useParams();
  const { uuid } = params as { uuid: string };

  const cards = [
    //index no bd
  ];

  return (
    <div className='flex flex-row h-full w-full justify-center items-center'>
      {
        cards.length === 0 ?  
          <h1>Vazio</h1>
        :
          <h1>Tem</h1>
      }
      <h1>Card ID: {uuid}</h1>
    </div>
  );
}