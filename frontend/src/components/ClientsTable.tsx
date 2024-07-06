"use client";

import { useState } from "react";
import ClientesButtons from "./ClientsButtons";
import OptionsButtons from "./OptionsButtons";
import { handleClick } from "@/utils/haddleClick";
import AddClienteModal from "./Modals/Client/AddClientModal";
import DeleteConfirmationModal from "./Modals/DeleteConfirmationModal";
import EditClienteModal from "./Modals/Client/EditClientModal";
import AddressModal from "./Modals/Client/AddressModal";

export default function ClientesTable() {
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const clientsPerPage = 12;

    // será preenchido com index do bd
    const clients = [
        { uuid: "adasdadasdada", nome: "João1", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João2", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João3", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João4", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João5", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João6", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João7", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João8", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João9", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João10", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João11", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João12", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João13", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João14", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João15", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João16", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João17", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João18", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João19", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João20", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João21", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João22", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João23", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João24", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João25", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João26", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
        { uuid: "adasdadasdada", nome: "João27", sobrenome: "Barbosa", email: "joao1.barbosa@outlook.com", aniversario: "03/08/2001", telefone: "(62) 99664-1935" },
    ];

    // Cálculo para a paginação
    const indexOfLastCliente = currentPage * clientsPerPage;
    const indexOfFirstCliente = indexOfLastCliente - clientsPerPage;
    const currentClientes = clients.slice(indexOfFirstCliente, indexOfLastCliente);

    const totalPages = Math.ceil(clients.length / clientsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <section className="flex flex-row justify-between pl-4 mb-4">
                <h1 className="text-4xl font-bold">Clientes</h1>
                <ClientesButtons onAddClick={() => handleClick(setIsAddModalOpen, true)} />
            </section>
            <section className="flex flex-col h-92p">
                <div className="flex-grow overflow-auto h-full">
                    <table className="min-w-full">
                        <thead className="bg-white">
                            <tr>
                                <th className="py-2 px-4 border-b">Nome</th>
                                <th className="py-2 px-4 border-b">Sobrenome</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Aniversário</th>
                                <th className="py-2 px-4 border-b">Telefone</th>
                                <th className="py-2 px-4 border-b">Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentClientes.map((client, index) => (
                                <tr key={index}>
                                    <th id="cliente" className="font-medium py-2 px-4 border-b">{client.nome}</th>
                                    <th className="font-medium py-2 px-4 border-b">{client.sobrenome}</th>
                                    <th className="font-medium py-2 px-4 border-b">{client.email}</th>
                                    <th className="font-medium py-2 px-4 border-b">{client.aniversario}</th>
                                    <th className="font-medium py-2 px-4 border-b">{client.telefone}</th>
                                    <th className="py-2 pr-0 border-b">
                                        <OptionsButtons
                                            onDeleteClick={() => handleClick(setIsDeleteModalOpen, true)}
                                            onEditClick={() => handleClick(setIsEditModalOpen, true)}
                                            onAddressClick={() => handleClick(setIsAddressModalOpen, true)}
                                            uuid={client.uuid}
                                        />
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-shrink-0 justify-center p-4 bg-gray-100">
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
            </section>
            <AddClienteModal isOpen={isAddModalOpen} onClose={() => handleClick(setIsAddModalOpen, false)} />
            <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => handleClick(setIsDeleteModalOpen, false)} />
            <EditClienteModal isOpen={isEditModalOpen} onClose={() => handleClick(setIsEditModalOpen, false)} />
            <AddressModal isOpen={isAddressModalOpen} onClose={() => handleClick(setIsAddressModalOpen, false)} />
        </>
    );
}
