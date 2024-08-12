'use client'
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { CardResponse } from "@/@types";
import { DeleteDialog } from "@/components/dialog/delete-dialog";
import { CircleX } from 'lucide-react';
import Cards from 'react-credit-cards-2';
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "./card.css";
import { Button } from "@/components/ui/button";

export default function CardsBoard({ params }: { params: { uuid: string } }) {
  const { uuid } = params;

  const { data: cardResponse, isLoading } = useQuery<CardResponse>({
    queryKey:['get-clients'],
    queryFn: async() => {
      const response = await fetch(`http://localhost:8000/api/clients/${uuid}/cards`);
      const data = await response.json();
    
      return data;
    },
    placeholderData: keepPreviousData
  });

  if(isLoading){
    return (
      <h1 className="text-8xl">Carregando...</h1>
    );
  }

  console.log(cardResponse?.data);

  if(!cardResponse?.data){
    return (
      <div className='flex flex-col h-full w-full justify-center items-center space-y-4'>
          <h1 className='font-semibold text-xl'>Nenhum Cartão de Crédito Cadastrado</h1>
          <h3>vai ter um botão aqui</h3>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full w-full justify-center items-center'>
      <section className='flex flex-row justify-end w-full'>
            <h3>Botão de add card</h3>
      </section>
      <section className='w-full h-full flex flex-wrap overflow-y-auto content-start justify-center my-2'>
      {cardResponse?.data.map((card, index) => {
        return(
          <div key={index} 
          className="relative flex flex-col w-48 h-[9rem] rounded 
          border border-gray-300 justify-end items-center m-2"
          >
            <DeleteDialog to='card' button = {
              <Button size='icon' variant='ghost' 
                className="absolute top-[0.01rem] right-0.5 size-[20px]"
              >
                <CircleX/>
              </Button>
            }/>
            {/* icon={<CircleX/>} size='h-[20px] w-[20px] absolute top-[0.01rem] right-1' */}
            <div className='mini-credit-card my-2'>
              <Cards
                cvc=""
                expiry={card.validade}
                name={card.nome}
                number={card.numero}
              />
            </div>
          </div>
        )
      })}
      </section>
    </div>
  );
}