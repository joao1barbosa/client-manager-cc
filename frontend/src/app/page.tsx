'use client'
import { useEffect, useRef, useState } from 'react';
import { OptionButtons } from '@/components/option-buttons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination } from "@/components/pagination";
import { useSearchParams, useRouter } from 'next/navigation';
import { AddClientDialog } from '@/components/dialog/add-client-dialog';
import { useReadClients } from '@/hooks/ClientQuerys';
import { useRefetch } from '@/hooks/useRefetch';
import { SearchBar } from '@/components/search-bar';
import { InfosDialog } from '@/components/dialog/infos-dialog';

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [clientsPerPage, setClientsPerPage] = useState<number>(10);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '');
  const currentPage = parseInt(searchParams.get('page') || '1');
  const tableRef = useRef<HTMLDivElement>(null);
  let qtdClients = 0;

  const { setRefetch } = useRefetch();
  const { data: clientsResponse, isLoading, refetch } = useReadClients(currentPage, clientsPerPage, searchTerm);

  // Função para calcular o numero de clientes por página
  const calculateClientsPerPage = () => {
    if (tableRef.current) {
      const tableHeight = tableRef.current.clientHeight;
      const rowHeight = 53; //tamanho de cada linha da tabela em pixels
      setClientsPerPage(Math.floor(tableHeight / rowHeight));
    }
  };

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);

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

  useEffect(() => {
    setRefetch(() => refetch);
  }, [refetch, setRefetch]);

  const handlePageChange = (page: number) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('page', page.toString());
    router.push(newUrl.toString());
  };

  const handleSearch = (term: string) => {
    const newUrl = new URL(window.location.href);
    term ? newUrl.searchParams.set('search', term) : newUrl.searchParams.delete('search');
    newUrl.searchParams.set('page', '1');
    router.push(newUrl.toString());
    setSearchTerm(term);
  };

  if(isLoading){
    return (
      <h1 className="text-4xl">Carregando...</h1>
    );
  }

  return (
  <div className="flex flex-col h-screen">
      <section className="relative flex flex-row justify-between items-center pb-3">
        <h1 className="absolute text-5xl z-0">Clientes</h1>
        <div className='w-full justify-end flex flex-row space-x-2 z-10'>
          <SearchBar onSearch={handleSearch}/>
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
              {isMobile ?
                <TableHead className="tableHead">Infos</TableHead>
              :
                <>
                  <TableHead className="tableHead">Email</TableHead>
                  <TableHead className="tableHead px-2 max-w-[100px]">Data de Nascimento</TableHead>
                  <TableHead className="tableHead">Telefone</TableHead>
                  <TableHead className="tableHead">Opções</TableHead> 
                </>
              }
            </TableRow>
          </TableHeader>
          <TableBody>
              {clientsResponse?.data.map((client) => {
                qtdClients++;
                return(
                  <TableRow key={client.uuid}>
                    <TableCell className='p-3'>{client.nome}</TableCell>
                    <TableCell className='p-2'>{client.sobrenome}</TableCell>
                    {isMobile ?
                      <TableCell className='p-2 text-center'><InfosDialog client={client}/></TableCell>
                    :
                      <>
                        <TableCell className='p-2'>{client.email}</TableCell>
                        <TableCell className='p-2'>{client.aniversario}</TableCell>
                        <TableCell className='p-2 text-nowrap'>{client.telefone}</TableCell>
                        <TableCell className='p-0.5'>
                          <OptionButtons uuid={client.uuid}/>
                        </TableCell>
                      </>
                    }
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
