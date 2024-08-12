'use client'

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { CardResponse } from "@/@types";

export default function Cards({ params }: { params: { uuid: string } }) {
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
      <h1 className="text-8xl">Sem cartão</h1>
    );
  }

  return (
    <div>
      {cardResponse?.data.map((card) => {
        return(
          <div key={card.uuid}>
            <p>{card.numero}</p>
            <p>{card.nome}</p>
            <p>{card.validade}</p>
            <p>{card.cvv}</p>
          </div>
        )
      })}
    </div>
  );
}