"use client"

import { 
    useState, Dispatch, SetStateAction, 
    createContext, PropsWithChildren
} from "react";

interface SeachContextType{
    search: string;
    setSearch: Dispatch<SetStateAction<string>>
}

const defaultValue: SeachContextType = {
    search: "",
    setSearch: () => {},
}

export const SearchContext = createContext<SeachContextType>(defaultValue);

export function SearchProvider({ children }: PropsWithChildren){
    const [search, setSearch] = useState<string>("");

    return (
        <SearchContext.Provider value={{search, setSearch}}>
            {children}
        </SearchContext.Provider>
    );
}