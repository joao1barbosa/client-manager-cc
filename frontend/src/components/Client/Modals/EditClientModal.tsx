"use client"

import { FormEvent, useState } from 'react';
import { isFormValidated } from '@/utils/validate';
import { updateClient } from '@/services/clients';
import toast, { Toaster } from 'react-hot-toast';
import InputField from '@/components/InputField';
import Modal from '@/components/Modal';

interface Props {
  uuid: string;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

const notify = (message: string) => toast(message);

const defaultFormData = {
  nome: '',
  sobrenome: '',
  email: '',
  aniversario: '',
  telefone: '',
};

export default function EditClienteModal({ uuid, isOpen, onClose, onEdit }: Props){
  const [formData, setFormData] = useState(defaultFormData);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        const validated = isFormValidated("edit");
        
        if (!validated){
          // Remover campos vazios do formData antes de enviar a requisição
          const filteredFormData = Object.keys(formData).reduce((acc, key) => {
            if (formData[key as keyof typeof formData] !== '') {
              acc[key as keyof typeof formData] = formData[key as keyof typeof formData];
            }
            return acc;
          }, {} as { [key in keyof typeof formData]?: typeof formData[key] });
          
          try {
            const response = await updateClient(uuid, filteredFormData);
            onEdit();
            onClose();
            setFormData(defaultFormData);
          } catch (error) {
            notify("Erro ao adicionar cliente: " + error);
          }
          onClose();
          return;
        }
        notify(validated);
      };

      return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <div className="flex flex-row justify-center mb-3">
            <h2 className="font-bold text-xl">Editar Cliente</h2>
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
                  className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 ml-2"
                >
                  Editar
                </button>
              </div>
            </form>
          <Toaster/>
        </Modal>
      );
    }