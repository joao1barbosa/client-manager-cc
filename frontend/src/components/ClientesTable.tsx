"use client"

import { useState } from "react";
import ClientesButtons from "./ClientesButtons";
import OptionsButtons from "./OptionsButtons";
import AddClienteModal from "./AddClienteModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { handleClick } from "@/utils/haddleClick";
import EditClienteModal from "./EditClienteModal";

export default function ClientesTable() {
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

    return (
        <>
        <div className="flex flex-row justify-between pl-4 mb-4">
          <h1 className="text-4xl font-bold">Clientes</h1>
          <ClientesButtons onAddClick={() => handleClick(setIsAddModalOpen, true)}/>
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
                <th id='cliente' className="font-medium py-2 px-4 border-b">João</th>
                <th className="font-medium py-2 px-4 border-b">barbosa</th>
                <th className="font-medium py-2 px-4 border-b">joao1.barbosa@outlook.com</th>
                <th className="font-medium py-2 px-4 border-b">03/08/2001</th>
                <th className="font-medium py-2 px-4 border-b">(62) 99664-1935</th>
                <th className="py-2 pr-0 border-b">
                  <OptionsButtons 
                    onDeleteClick={() => handleClick(setIsDeleteModalOpen, true)}
                    onEditClick={() => handleClick(setIsEditModalOpen, true)}
                  />
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <AddClienteModal isOpen={isAddModalOpen} onClose={() => handleClick(setIsAddModalOpen, false)}/>
        <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => handleClick(setIsDeleteModalOpen, false)}/>
        <EditClienteModal isOpen={isEditModalOpen} onClose={() => handleClick(setIsEditModalOpen, false)}/>
      </>
    );
  }