import Cards from 'react-credit-cards-2';
import "react-credit-cards-2/dist/es/styles-compiled.css";

interface Props{
    card: {
        number: string,
        name:string,
        expiry: string,
    }
}

export default function CardBlock({ card }: Props){
    const hideCardNumer = (number: string): string => {
        return number.slice(0,3) + "* **** **** *" + number.slice(16,20);
    }

    return (
        <aside className='flex flex-col w-48 h-[9.5rem] rounded border border-gray-300 justify-end items-center'>
            <section className='flex flex-row justify-end'>

            </section>
            <div className='mini-credit-card my-2'>
            <Cards
                cvc=""
                expiry={card.expiry}
                name={card.name}
                number={hideCardNumer(card.number)}
            />

            </div>
        </aside>
    );
}