"use client"

//@ts-ignore
import InputMask from 'react-input-mask';
import { FormEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Cards from 'react-credit-cards-2';
import Modal from "./Modal";
import "react-credit-cards-2/dist/es/styles-compiled.css";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const notify = (menssage: string) => toast(menssage);

export default function AddCardModal({ isOpen, onClose }: Props) {
    const [cardInfo, setCardInfo] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCardInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(!cardInfo.cvc || !cardInfo.expiry || !cardInfo.name || !cardInfo.number ||
            cardInfo.cvc.includes("_") || cardInfo.expiry.includes("_") || cardInfo.number.includes("_")
        ){
            notify("Preencha todos os campos!");
            return;
        }

        //increver no bd
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className='flex flex-col space-y-4 items-center justify-center'>
                <Cards
                    name={cardInfo.name}
                    number={cardInfo.number}
                    expiry={cardInfo.expiry}
                    cvc={cardInfo.cvc}
                />
                <form noValidate className="w-3/4 flex flex-col space-y-4 items-center" onSubmit={handleSubmit}>
                    <div className='flex flex-col space-y-4 items-center'>
                        <InputMask
                            className="w-3/4 p-2 border border-gray-300 rounded text-center text-xl placeholder:text-center"
                            name="number"
                            type="text"
                            placeholder="Número do Cartão"
                            mask="9999 9999 9999 9999"
                            onChange={handleInputChange}
                            value={cardInfo.number}
                        />
                        <input
                            className="w-3/4 p-2 border border-gray-300 rounded text-center text-xl placeholder:text-center"
                            name="name"
                            type="text"
                            placeholder="Nome do Titular"
                            onChange={handleInputChange}
                            value={cardInfo.name}
                        />
                        <div className="w-3/4 m-0 flex flex-row space-x-6 justify-center">
                            <InputMask
                                className="w-full p-2 border border-gray-300 rounded text-center text-xl placeholder:text-center"
                                name="expiry"
                                type="text"
                                placeholder="MM/AA"
                                mask="99/99"
                                onChange={handleInputChange}
                                value={cardInfo.expiry}
                            />
                            <InputMask
                                className="w-full p-2 border border-gray-300 rounded text-center text-xl placeholder:text-center"
                                name="cvc"
                                type="text"
                                placeholder="CVC"
                                mask="999"
                                onChange={handleInputChange}
                                value={cardInfo.cvc}
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
