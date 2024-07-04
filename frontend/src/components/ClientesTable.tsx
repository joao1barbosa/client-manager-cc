export default function ClientesTable() {
    return (
        <main className="relative w-3/4 h-[80vh] bg-gray-100 rounded-lg p-4 overflow-hidden">
          <h1 className="text-4xl font-bold mb-4 ml-4">Clientes</h1>
          <div className="overflow-auto h-full">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Nome</th>
                  <th className="py-2 px-4 border-b">Sobrenome</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Aniversário</th>
                </tr>
              </thead>
              <tbody>
                {/* Adicione aqui as linhas da tabela */}
              </tbody>
            </table>
          </div>
        </main>
    );
  }