"use client"

import { useState } from "react";
import ClientesButtons from "./ClientesButtons";
import OptionsButtons from "./OptionsButtons";
import AddClienteModal from "./AddClienteModal";

export default function ClientesTable() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleAddClick = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };

    return (
        <main className="relative w-3/4 h-[80vh] bg-gray-100 rounded-lg p-4 overflow-hidden">
        <div className="flex flex-row justify-between pl-4 mb-4">
          <h1 className="text-4xl font-bold">Clientes</h1>
          <ClientesButtons onAddClick={handleAddClick}/>
        </div>
          <div className="overflow-auto h-full">
            <table className="min-w-full">
              <thead className=" bg-white">
                <tr>
                    <th className="py-2 px-4 border-b">Nome</th>
                    <th className="py-2 px-4 border-b">Sobrenome</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Aniversário</th>
                    <th className="py-2 px-4 border-b">Telefone</th>
                    <th className="py-2 px-4 border-b">Opções</th>
                </tr>
              </thead>
              <tbody >
                <tr>
                    <th className="font-medium py-2 px-4 border-b">João</th>
                    <th className="font-medium py-2 px-4 border-b">barbosa</th>
                    <th className="font-medium py-2 px-4 border-b">joao1.barbosa@outlook.com</th>
                    <th className="font-medium py-2 px-4 border-b">03/08/2001</th>
                    <th className="font-medium py-2 px-4 border-b">(62) 99664-1935</th>
                    <th className="py-2 pr-0 border-b"><OptionsButtons/></th>
                </tr>
              </tbody>
            </table>
          </div>
          <AddClienteModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </main>
    );
  }