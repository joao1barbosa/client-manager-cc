"use client"
import { FormEvent, useState } from 'react';
import { isFormValidated } from '@/utils/validate';
import { createClient } from '@/services/clients';
import toast, { Toaster } from 'react-hot-toast';
import InputField from '@/components/InputField';
import Modal from '@/components/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const notify = (message: string) => toast(message);

export default function AddClienteModal({isOpen, onClose}: Props){
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    aniversario: '',
    telefone: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        const validated = isFormValidated("add");
        
        if (!validated){
          try {
            const response = await createClient(formData);
            onClose();
          } catch (error) {
            notify("Erro ao adicionar cliente: " + error);
          }
          onClose();
        }
        notify(validated);
      };

      return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <div className="flex flex-row justify-center mb-3">
            <h2 className="font-bold text-xl">Adicionar Cliente</h2>
          </div>
            <form noValidate onSubmit={handleSubmit}>
              <InputField 
                id="nome" type="text" label="Nome" placeholder="Nome"
                value={formData.nome} onChange={handleChange}
              />
              <InputField 
                id="sobrenome" type="text" label="Sobrenome"placeholder="Sobrenome"
                value={formData.sobrenome} onChange={handleChange}
              />
              <InputField 
                id="email" type="email" label="Email" placeholder="Email"
                value={formData.email} onChange={handleChange}
              />
              <InputField 
                id="aniversario" type="text" label="Data de Nascimento"
                value={formData.aniversario} onChange={handleChange}
              />
              <InputField 
                id="telefone" type="text" label="Telefone"
                value={formData.telefone} onChange={handleChange}
              />

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
                  Adicionar
                </button>
              </div>
            </form>
          <Toaster/>
        </Modal>
      );
    }