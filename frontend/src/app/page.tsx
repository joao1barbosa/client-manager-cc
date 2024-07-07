import ClientesTable from "@/components/ClientsTable";
import { SearchProvider } from "@/contexts/SeachContext";

export default function Home() {
  return (
    <SearchProvider>
      <ClientesTable/> 
    </SearchProvider>
  );
}
