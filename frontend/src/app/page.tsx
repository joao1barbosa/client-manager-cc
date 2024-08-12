'use client'
import { useEffect, useRef, useState } from 'react';
import { OptionButtons } from '@/components/option-buttons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Pagination } from "@/components/pagination";
import { useSearchParams, useRouter } from 'next/navigation';
import { AddDialog } from '@/components/dialog/add-client-dialog';
import { ClientResponse } from '@/@types/';

export default function Home() {
  const [clientsPerPage, setClientsPerPage] = useState<number>(10);
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const tableRef = useRef<HTMLDivElement>(null);
  let qtdClients = 0;
  
  const { data: clientsResponse, isLoading } = useQuery<ClientResponse>({
    queryKey:['get-clients', currentPage, clientsPerPage],
    queryFn: async() => {
      const response = await fetch(`http://localhost:8000/api/clients?per_page=${clientsPerPage}&page=${currentPage}`);
      const data = await response.json();

      return data;
    },
    placeholderData: keepPreviousData
  });

  // Função para calcular o numero de clientes por página
  const calculateClientsPerPage = () => {
    if (tableRef.current) {
      const tableHeight = tableRef.current.clientHeight;
      const rowHeight = 58; //tamanho de cada linha da tabela
      setClientsPerPage(Math.floor(tableHeight / rowHeight));
    }
  };

  useEffect(() => {
    const handleResize = () => {
      // Atrasa o cálculo para garantir a renderização completa
      setTimeout(() => {
        requestAnimationFrame(calculateClientsPerPage);
      }, 50);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [tableRef]);

  useEffect(() => {
    calculateClientsPerPage();
  }, [clientsResponse]);

  const handlePageChange = (page: number) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('page', page.toString());
    router.push(newUrl.toString());
  };

  if(isLoading){
    return (
      <h1 className="text-8xl">Carregando...</h1>
    );
  }

  return (
  <div className="flex flex-col h-screen">
      <section className="flex flex-row justify-between items-center pb-3">
        <h1 className="text-5xl">Clientes</h1>
        <div>
          <AddDialog/>
        </div>
      </section>
      <section className="flex flex-col flex-grow overflow-hidden">
        <div ref={tableRef} className="flex-grow overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="tableHead">Nome</TableHead>
              <TableHead className="tableHead">Sobrenome</TableHead>
              <TableHead className="tableHead">Email</TableHead>
              <TableHead className="tableHead">Data de Nascimento</TableHead>
              <TableHead className="tableHead">Telefone</TableHead>
              <TableHead className="tableHead">Opções</TableHead> 
            </TableRow>
          </TableHeader>
          <TableBody>
              {clientsResponse?.data.map((client) => {
                qtdClients++;
                return(
                  <TableRow key={client.uuid}>
                    <TableCell>{client.nome}</TableCell>
                    <TableCell>{client.sobrenome}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.aniversario}</TableCell>
                    <TableCell>{client.telefone}</TableCell>
                    <TableCell className='p-0.5'>
                      <OptionButtons uuid={client.uuid}/>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
        </div>

        {clientsResponse && <Pagination
          pages={clientsResponse.pages}
          page = {currentPage}
          items={clientsResponse.items}
          onPageChange={handlePageChange}
          qtdAtual={qtdClients}
        />}
      </section>
    </div>
  );
}
