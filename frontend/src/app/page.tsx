'use client'
import { OptionButton } from "@/components/ui/optionButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Pagination } from "@/components/pagination";

export interface ClientResponse {
  first: number
  prev: number | null
  next: number | null
  last: number
  page: number
  pages: number
  items: number
  data: Client[]
}

export interface Client {
  uuid: string
  nome: string
  sobrenome: string
  email: string
  aniversario: string
  telefone: string
}



export default function Home() {
  const { data: clientsResponse, isLoading } = useQuery<ClientResponse>({
    queryKey:['get-clients'],
    queryFn: async() => {
      const response = await fetch('http://localhost:8000/api/clients?per_page=15&page=1');
      const data = await response.json();

      console.log(data);

      return data;
    },
  });

  if(isLoading){
    return (
      <h1 className="text-8xl">Carregando...</h1>
    );
  }

  return (
  <>
      <section className="flex flex-row justify-between items-center">
        <h1 className="text-5xl">Clientes</h1>
        <div>
          <OptionButton icon={<Plus/>}/>
        </div>
      </section>
      <section className="flex flex-col">
        <div className="max-h-[600px] overflow-y-scroll overflow-x-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="tableHead">Nome</TableHead>
              <TableHead className="tableHead">Sobrenome</TableHead>
              <TableHead className="tableHead">Email</TableHead>
              <TableHead className="tableHead">Data de Nascimento</TableHead>
              <TableHead className="tableHead">Opções</TableHead> 
            </TableRow>
          </TableHeader>
          <TableBody>
              {clientsResponse?.data.map((client) => {
                return(
                  <TableRow key ={client.uuid}>
                    <TableCell>{client.nome}</TableCell>
                    <TableCell>{client.sobrenome}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.aniversario}</TableCell>
                    <TableCell>OptButtons</TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
        </div>

        {clientsResponse && <Pagination
          pages={clientsResponse.pages}
          page = {1}
          items={clientsResponse.items}
        />}
      </section>
    </>
  );
}
