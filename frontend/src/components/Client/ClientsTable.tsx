"use client"

import DeleteConfirmationModal from "./Modals/DeleteConfirmationModal";
import EditClienteModal from "../Client/Modals/EditClientModal";
import AddressModal from "../Client/Modals/AddressModal";
import OptionsButtons from "./OptionsButtons";
import { useState } from "react";
import { handleClick } from "@/utils/hadleClick";
import { useSearch } from "@/hooks/useSearch";

interface Client{
    uuid: string;
    nome: string,
    sobrenome: string;
    email: string;
    aniversario: string;
    telefone: string;
}

interface Props{
    clients: Client[];
}

export default function ClientesTable({ clients }: Props) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);

    const [currentClient, setCurrentClient] = useState<string>("");
    
    const [currentPage, setCurrentPage] = useState<number>(1);
    const clientsPerPage = 12;

    const { search } = useSearch();
    
    const filteredClients = clients.filter((client) =>
        client.nome.toLowerCase().includes(search.toLowerCase()) 
    );
    
    // Cálculo para a paginação
    const indexOfLastCliente = currentPage * clientsPerPage;
    const indexOfFirstCliente = indexOfLastCliente - clientsPerPage;
    const currentClientes = filteredClients.slice(indexOfFirstCliente, indexOfLastCliente);
    const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleOptionClick = (
        func: (value: boolean) => void, 
        value: boolean, 
        uuid: string
    ) => {
        setCurrentClient(uuid);
        handleClick(func, value);
    }

    return (
        <>
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
                                            uuid={client.uuid}
                                            onDeleteClick={() => handleOptionClick(setIsDeleteModalOpen, true, client.uuid)}
                                            onEditClick={() => handleClick(setIsEditModalOpen, true)}
                                            onAddressClick={() => handleClick(setIsAddressModalOpen, true)}
                                        />
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-shrink-0 justify-center bg-gray-100">
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

            <DeleteConfirmationModal uuid={currentClient} isOpen={isDeleteModalOpen} onClose={() => handleClick(setIsDeleteModalOpen, false)} />
            <EditClienteModal uuid={currentClient} isOpen={isEditModalOpen} onClose={() => handleClick(setIsEditModalOpen, false)} />
            <AddressModal uuid={currentClient} isOpen={isAddressModalOpen} onClose={() => handleClick(setIsAddressModalOpen, false)} />
        </>
    );
}
