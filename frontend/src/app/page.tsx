"use client"

import { useState } from "react";
import ClientesTable from "@/components/ClientsTable";
import ClientesButtons from "../components/ClientsButtons";
import AddClienteModal from "../components/Modals/Client/AddClientModal"
import { SearchProvider } from "@/contexts/SeachContext";
import { handleClick } from "@/utils/hadleClick";

export default function Home() {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  
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
  
  return (
    <SearchProvider>
      <section className="flex flex-row justify-between pl-4 mb-4">
        <h1 className="text-4xl font-bold">Clientes</h1>
        <ClientesButtons onAddClick={() => handleClick(setIsAddModalOpen, true)} />
      </section>
      <section className="flex flex-col h-92p">
        <ClientesTable clients={clients}/>   
      </section>
      <AddClienteModal isOpen={isAddModalOpen} onClose={() => handleClick(setIsAddModalOpen, false)} />
    </SearchProvider>
  );
}
