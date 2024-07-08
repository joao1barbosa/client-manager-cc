import Cards from 'react-credit-cards-2';
import "react-credit-cards-2/dist/es/styles-compiled.css";

interface Props {
  card: {
    number: string,
    name: string,
    expiry: string,
  }
}

export default function CardBlock({ card }: Props) {
  return (
    <aside className='relative flex flex-col w-48 h-[9rem] rounded border border-gray-300 justify-end items-center m-2'>
        <button 
            className='absolute top-[0rem] right-1 text-xl'
        >
        &times;
        </button>
        <div className='mini-credit-card my-2'>
            <Cards
                cvc=""
                expiry={card.expiry}
                name={card.name}
                number={card.number}
            />
        </div>
    </aside>
  );
}
