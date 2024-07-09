"use client"

//@ts-ignore
import InputMask from 'react-input-mask';
import { FormEvent, useState } from 'react';
import { createCard } from '@/services/cards';
import toast, { Toaster } from 'react-hot-toast';
import Cards from 'react-credit-cards-2';
import Modal from "../Modal";
import "react-credit-cards-2/dist/es/styles-compiled.css";

interface Props {
    uuid: string;
    isOpen: boolean;
    onClose: () => void;
}

interface Card {
    numero?: string;
    nome: string;
    validade: string;
    cvv: string;
}

const notify = (message: string) => toast(message);

export default function AddCardModal({ uuid, isOpen, onClose }: Props) {
    const [cardInfo, setCardInfo] = useState<Card>({
        numero: "",
        nome: "",
        validade: "",
        cvv: "",
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCardInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(!cardInfo.cvv || !cardInfo.validade || !cardInfo.nome || !cardInfo.numero ||
            cardInfo.cvv.includes("_") || cardInfo.validade.includes("_") || cardInfo.numero.includes("_")
        ){
            notify("Preencha todos os campos!");
            return;
        }
        const replacedNumero = cardInfo.numero.replaceAll(" ", "-");
        delete cardInfo.numero;
        await createCard({numero: replacedNumero,...cardInfo, client_uuid: uuid});
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className='flex flex-col space-y-4 items-center justify-center'>
                <Cards
                    name={cardInfo.nome}
                    number={cardInfo.numero || ""}
                    expiry={cardInfo.validade}
                    cvc={cardInfo.cvv}
                />
                <form noValidate className="w-3/4 flex flex-col space-y-4 items-center" onSubmit={handleSubmit}>
                    <div className='flex flex-col space-y-4 items-center'>
                        <InputMask
                            className="w-3/4 p-2 border border-gray-300 rounded text-center text-xl placeholder:text-center"
                            name="numero"
                            type="text"
                            placeholder="Número do Cartão"
                            mask="9999 9999 9999 9999"
                            onChange={handleInputChange}
                            value={cardInfo.numero}
                        />
                        <input
                            className="w-3/4 p-2 border border-gray-300 rounded text-center text-xl placeholder:text-center"
                            name="nome"
                            type="text"
                            placeholder="Nome do Titular"
                            onChange={handleInputChange}
                            value={cardInfo.nome}
                        />
                        <div className="w-3/4 m-0 flex flex-row space-x-6 justify-center">
                            <InputMask
                                className="w-full p-2 border border-gray-300 rounded text-center text-xl placeholder:text-center"
                                name="validade"
                                type="text"
                                placeholder="MM/AA"
                                mask="99/99"
                                onChange={handleInputChange}
                                value={cardInfo.validade}
                            />
                            <InputMask
                                className="w-full p-2 border border-gray-300 rounded text-center text-xl placeholder:text-center"
                                name="cvv"
                                type="text"
                                placeholder="CVV"
                                mask="999"
                                onChange={handleInputChange}
                                value={cardInfo.cvv}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-2"
                        >
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
            <Toaster/>
        </Modal>
    );
}
