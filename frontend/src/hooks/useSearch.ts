import { useContext } from "react";
import { SearchContext } from "@/contexts/SeachContext";

export function useSearch(){
    return useContext(SearchContext);
}