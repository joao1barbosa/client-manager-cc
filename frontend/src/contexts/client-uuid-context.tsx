import { PropsWithChildren, createContext} from 'react';

export const ClientUuidContext = createContext<string | undefined>(undefined);

interface ClientUuidProviderProps{
    uuid: string
}

export function ClientUuidProvider ( { children, uuid }: PropsWithChildren<ClientUuidProviderProps> ) {
  return (
    <ClientUuidContext.Provider value={uuid}>
      {children}
    </ClientUuidContext.Provider>
  );
};
