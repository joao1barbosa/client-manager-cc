import CardBlock from '@/components/Card/CardBlock';
import AddCardButton from '@/components/Card/AddCardButton';
import { getClientCards } from '@/services/cards';

interface Props {
  uuid: string;
  setModal: () => void;
}

interface Card {
    numero: string;
    nome: string;
    validade: string;
    cvv: string;
    client_uuid: string;
}

export default async function ClientCards({ uuid, setModal }: Props) {
  const cards: Card[] = await getClientCards(uuid);
  console.log(cards);

  return (
    <>
      <div className='flex flex-row h-full w-full justify-center items-center'>
        {cards.length === 0 ? (
          <div className='flex flex-col space-y-4'>
            <h1 className='font-semibold text-xl'>
              Nenhum Cartão de Credito Cadastrado
            </h1>
            <AddCardButton onClick={setModal} />
          </div>
        ) : (
          <div className='flex flex-col h-full w-full'>
            <section className='flex flex-row justify-end'>
              <AddCardButton onClick={setModal} />
            </section>
            <section className='w-full h-full flex flex-wrap overflow-y-auto content-start justify-center my-2'>
              {cards.map((card, index) => (
                <CardBlock key={index} card={card}/>
              ))}
            </section>
          </div>
        )}
      </div>
      
    </>
  );
}
