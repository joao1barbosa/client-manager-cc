import { FormEvent } from 'react';
import { locationValidate } from '@/utils/validate';
import toast, { Toaster } from 'react-hot-toast';
import InputField from '../InputField';
import Modal from "./Modal";

interface Props {
    uuid: string
    isOpen: boolean;
    onClose: () => void;
}

const notify = (menssage: string) => toast(menssage);

export default function LocationModal({ uuid, isOpen, onClose }: Props){
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); 
        
        const validated = locationValidate();
        
        if (!validated){
          //inscrever no bd
          onClose();
        }
        notify(validated);
      };

    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-row justify-center mb-3">
                <h2 className="font-bold text-xl">Endereço do Cliente</h2>
            </div>
            <form noValidate onSubmit={handleSubmit}>
                <InputField id="nome" type="text" label="Nome" placeholder="Nome"/>
                <InputField id="sobrenome" type="text" label="Sobrenome"placeholder="Sobrenome"/>
                <InputField id="email" type="email" label="Email" placeholder="Email"/>
                <InputField id="aniversario" type="text" label="Data de Nascimento"/>
                <InputField id="telefone" type="text" label="Telefone"/>

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
                        className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-600 ml-2"
                    >
                        Adicionar
                    </button>
                </div>
            </form>
          <Toaster/>
        </Modal>
    );
}