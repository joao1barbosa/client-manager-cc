'use client'
import { useEffect, useRef, useState } from 'react';
import { OptionButtons } from '@/components/option-buttons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination } from "@/components/pagination";
import { useSearchParams, useRouter } from 'next/navigation';
import { AddClientDialog } from '@/components/dialog/add-client-dialog';
import { useReadClients } from '@/hooks/useClient';

export default function Home() {
  const [clientsPerPage, setClientsPerPage] = useState<number>(10);
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const tableRef = useRef<HTMLDivElement>(null);
  let qtdClients = 0;
  
  const { data: clientsResponse, isLoading } = useReadClients(currentPage, clientsPerPage);

  // Função para calcular o numero de clientes por página
  const calculateClientsPerPage = () => {
    if (tableRef.current) {
      const tableHeight = tableRef.current.clientHeight;
      const rowHeight = 58; //tamanho de cada linha da tabela em pixels
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
          <AddClientDialog/>
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
              <TableHead className="tableHead px-2 max-w-[100px]">Data de Nascimento</TableHead>
              <TableHead className="tableHead">Telefone</TableHead>
              <TableHead className="tableHead">Opções</TableHead> 
            </TableRow>
          </TableHeader>
          <TableBody>
              {clientsResponse?.data.map((client) => {
                qtdClients++;
                return(
                  <TableRow key={client.uuid}>
                    <TableCell className='p-3'>{client.nome}</TableCell>
                    <TableCell className='p-2'>{client.sobrenome}</TableCell>
                    <TableCell className='p-2'>{client.email}</TableCell>
                    <TableCell className='p-2'>{client.aniversario}</TableCell>
                    <TableCell className='p-2'>{client.telefone}</TableCell>
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
