import { useContext } from "react";
import { RefetchContext } from "@/contexts/RefetchContext";

export function useRefetch() {
    const context = useContext(RefetchContext);
    if (!context) {
        throw new Error("useRefetch must be used within a RefetchProvider");
    }
    return context;
}