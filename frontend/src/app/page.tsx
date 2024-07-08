"use client"

import { useState, useEffect } from "react";
import ClientesTable from "@/components/Client/ClientsTable";
import ClientesButtons from "@/components/Client/ClientsButtons";
import AddClienteModal from "../components/Client/Modals/AddClientModal"
import { SearchProvider } from "@/contexts/SeachContext";
import { handleClick } from "@/utils/hadleClick";
import { getClients } from "@/services/clients";

export default function Home() {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [clients, setClients] = useState([]);
  
  const fetchClients = async () => {
    const data = await getClients();
    setClients(data);
  };

  useEffect(() => {
    fetchClients();
  }, [isAddModalOpen]);
  
  return (
    <SearchProvider>
      <section className="flex flex-row justify-between pl-4 mb-4">
        <h1 className="text-4xl font-bold">Clientes</h1>
        <ClientesButtons onAddClick={() => handleClick(setIsAddModalOpen, true)} />
      </section>
      <section className="flex flex-col h-92p">
        <ClientesTable clients={clients} onChange={fetchClients}/>   
      </section>
      <AddClienteModal isOpen={isAddModalOpen} onClose={() => handleClick(setIsAddModalOpen, false)} />
    </SearchProvider>
  );
}
