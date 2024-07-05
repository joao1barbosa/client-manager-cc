"use client"

import { useState } from "react";
import ClientesButtons from "./ClientesButtons";
import OptionsButtons from "./OptionsButtons";
import { handleClick } from "@/utils/haddleClick";
import AddClienteModal from "./Modals/AddClienteModal";
import DeleteConfirmationModal from "./Modals/DeleteConfirmationModal";
import EditClienteModal from "./Modals/EditClienteModal";
import AddressModal from "./Modals/AddressModal";

export default function ClientesTable() {
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const clientesPerPage = 12;

    //será preenchido com index do bd
    const clientes = [
      { uuid:"adasdadasdada", nome: "João1", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João2", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João3", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João4", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João5", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João6", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João7", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João8", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João9", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João10", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João11", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João12", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João13", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João14", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João15", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João16", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João17", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João18", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João19", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João20", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João21", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João22", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João23", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João24", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João25", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João26", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
      { uuid:"adasdadasdada", nome: "João27", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
    
    ];

    // Cálculo para a paginação
    const indexOfLastCliente = currentPage * clientesPerPage;
    const indexOfFirstCliente = indexOfLastCliente - clientesPerPage;
    const currentClientes = clientes.slice(indexOfFirstCliente, indexOfLastCliente);

    const totalPages = Math.ceil(clientes.length / clientesPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
        <div className="flex flex-row justify-between pl-4 mb-4">
          <h1 className="text-4xl font-bold">Clientes</h1>
          <ClientesButtons onAddClick={() => handleClick(setIsAddModalOpen, true)}/>
        </div>
        <div className="relative overflow-auto h-full">
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
              {currentClientes.map((cliente, index) => (
                <tr key={index}>
                  <th id='cliente' className="font-medium py-2 px-4 border-b">{cliente.nome}</th>
                  <th className="font-medium py-2 px-4 border-b">{cliente.sobrenome}</th>
                  <th className="font-medium py-2 px-4 border-b">{cliente.email}</th>
                  <th className="font-medium py-2 px-4 border-b">{cliente.aniversario}</th>
                  <th className="font-medium py-2 px-4 border-b">{cliente.telefone}</th>
                  <th className="py-2 pr-0 border-b">
                    <OptionsButtons 
                      onDeleteClick={() => handleClick(setIsDeleteModalOpen, true)}
                      onEditClick={() => handleClick(setIsEditModalOpen, true)}
                      onAddressClick={() => handleClick(setIsAddressModalOpen, true)}
                      uuid={cliente.uuid}
                    />
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-14 bg-gray-100">
            {Array.from({ length: totalPages }, (_, index) => (
              <button 
                key={index} 
                onClick={() => handlePageChange(index + 1)} 
                className={`px-3 py-1 mx-1 rounded ${
                  currentPage === index + 1 ? 
                    'bg-gray-500 text-white' 
                  : 
                    'bg-gray-200 text-black'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <AddClienteModal isOpen={isAddModalOpen} onClose={() => handleClick(setIsAddModalOpen, false)}/>
        <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => handleClick(setIsDeleteModalOpen, false)}/>
        <EditClienteModal isOpen={isEditModalOpen} onClose={() => handleClick(setIsEditModalOpen, false)}/>
        <AddressModal isOpen={isAddressModalOpen} onClose={() => handleClick(setIsAddressModalOpen, false)}/>
      </>
    );
  }