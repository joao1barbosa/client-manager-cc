import { useState, ChangeEvent, FormEvent } from 'react';
import Modal from './Modal';
import InputField from './InputField';
import { isFormValidated } from '@/utils/validate';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddClienteModal({isOpen, onClose}: Props){
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isFormValidated()){
          //inscrever no bd
          onClose();
        }
        
      };

      return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <div className="flex flex-row justify-center mb-3">
            <h2 className="font-bold text-xl">Adicionar Cliente</h2>
          </div>
            <form noValidate onSubmit={handleSubmit}>
              <InputField id="nome" type="text" placeholder="Nome"/>
              <InputField id="sobrenome" type="text" placeholder="Sobrenome"/>
              <InputField id="email" type="email" placeholder="Email"/>
              <InputField id="aniversario" type="text" placeholder="Data de Nascimento"/>
              <InputField id="telefone" type="text" placeholder="Telefone"/>

              <div className="flex justify-end">
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
                  Adicionar
                </button>
              </div>
            </form>
        </Modal>
      );
}