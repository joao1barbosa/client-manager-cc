'use client'
import { DeleteDialog } from "@/components/dialog/delete-dialog";
import { CircleX } from 'lucide-react';
import Cards from 'react-credit-cards-2';
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "./card.css";
import { Button } from "@/components/ui/button";
import { AddCardDialog } from "@/components/dialog/add-card-dialog";
import { useReadCards } from "@/hooks/CardQuerys";
import { useRefetch } from "@/hooks/useRefetch";
import { useEffect } from "react";

export default function CardsPage({ params }: { params: { uuid: string } }) {
  const { uuid } = params;
  const { data: cardResponse, isLoading, refetch } = useReadCards(uuid);
  const { setRefetch } = useRefetch();

  useEffect(() => {
    setRefetch(() => refetch);
  }, [refetch, setRefetch]);

  if(isLoading){
    return (
      <h1 className="text-8xl">Carregando...</h1>
    );
  }

  if(!cardResponse?.data){
    return (
      <div className='flex flex-col h-full w-full justify-center items-center space-y-4'>
          <h1 className='font-semibold text-xl'>Nenhum Cartão de Crédito Cadastrado</h1>
          <AddCardDialog/>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full w-full justify-center items-center'>
      <section className='flex flex-row justify-between items-center pb-3 w-full'>
        <h1 className="text-4xl">Cards</h1>
        <AddCardDialog/>
      </section>
      <section className='w-full h-full flex flex-wrap overflow-y-auto content-start justify-center my-2'>
      {cardResponse?.data.map((card, index) => {
        return(
          <div key={index} 
          className="relative flex flex-col w-48 h-[9rem] rounded 
          border border-gray-300 justify-end items-center m-2"
          >
            <DeleteDialog to='card' uuid={card.uuid} button = {
              <Button size='icon' variant='ghost' 
                className="absolute top-[0.01rem] right-0.5 size-[20px]"
              >
                <CircleX/>
              </Button>
            }/>
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