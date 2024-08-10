import { OptionButton } from "@/components/ui/optionButton";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="flex flex-row justify-between items-center">
        <h1 className="text-5xl">Clientes</h1>
        <div>
          <OptionButton icon={<Plus/>}/>
        </div>
      </section>
      <section>
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
            {/* usar resposta da api */}
          </TableBody>
        </Table>
      </section>
    </>
  );
}
