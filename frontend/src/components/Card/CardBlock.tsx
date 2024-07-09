import { deleteCard } from '@/services/cards';
import Cards from 'react-credit-cards-2';
import "react-credit-cards-2/dist/es/styles-compiled.css";

interface Props {
  card: {
    numero: string;
    nome: string;
    validade: string;
    cvv: string;
    client_uuid: string;
  }
}

export default function CardBlock({ card }: Props) {
  const handleDeleteClick = async () => {
    console.log(card.numero);
    await deleteCard(card.numero);
  }

  return (
    <aside className='relative flex flex-col w-48 h-[9rem] rounded border border-gray-300 justify-end items-center m-2'>
      <button className='absolute top-[0.01rem] right-1 text-xl' onClick={handleDeleteClick}>
        &times;
      </button>
      <div className='mini-credit-card my-2'>
        <Cards
          cvc=""
          expiry={card.validade}
          name={card.nome}
          number={card.numero.replaceAll("%", " ")}
        />
      </div>
    </aside>
  );
}
