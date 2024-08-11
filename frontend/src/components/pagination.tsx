import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { OptionButton } from "./ui/optionButton";

interface PaginationProps {
    pages: number
    page: number
    items: number
}

export function Pagination({pages, page, items}: PaginationProps){
    return (
        <div className="flex text-sm items-center justify-between my-3">
            <span>Apresentando 10 de {items} itens</span>
            <div className="flex items-center gap-8">
                <span>Página {page} de {pages} </span>
                <div className="space-x-1.5">
                    <OptionButton 
                        size={'h-[25px] w-[30px]'} 
                        icon={<ChevronsLeft className="size-4"/>} 
                        disable={true}
                    />
                    <OptionButton 
                        size={'h-[25px] w-[30px]'} 
                        icon={<ChevronLeft className="size-4"/>}
                    />
                    <OptionButton 
                        size={'h-[25px] w-[30px]'} 
                        icon={<ChevronRight className="size-4"/>}
                    />
                    <OptionButton 
                        size={'h-[25px] w-[30px]'} 
                        icon={<ChevronsRight className="size-4"/>}
                    />
                </div>

            </div>
        </div>
    );
}