import { useContext } from "react";
import { ClientUuidContext } from "@/contexts/client-uuid-context";

export function useUuid() {
    const context = useContext(ClientUuidContext);
    if (!context) {
        throw new Error("useRefetch must be used within a RefetchProvider");
    }
    return context;
}