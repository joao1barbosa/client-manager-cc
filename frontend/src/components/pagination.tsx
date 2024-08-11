'use client'

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { OptionButton } from "./ui/optionButton";


interface PaginationProps {
    pages: number;
    page: number;
    items: number;
    onPageChange: (page: number) => void;
}

export function Pagination({pages, page, items, onPageChange}: PaginationProps){
    return (
        <div className="flex flex-shrink-0 text-sm items-center justify-between my-3">
            <span>Apresentando 10 de {items} itens</span>
            <div className="flex items-center gap-8">
                <span>Página {page} de {pages} </span>
                <div className="space-x-1.5">
                    <OptionButton 
                        size={'h-[25px] w-[30px]'} 
                        icon={<ChevronsLeft className="size-4"/>} 
                        onClick={() => onPageChange(1)}
                        disable={ page === 1 }
                    />
                    <OptionButton 
                        size={'h-[25px] w-[30px]'} 
                        icon={<ChevronLeft className="size-4"/>}
                        onClick={() => onPageChange(page-1)}
                        disable={ (page - 1) <= 0 }
                    />
                    <OptionButton 
                        size={'h-[25px] w-[30px]'} 
                        icon={<ChevronRight className="size-4"/>}
                        onClick={() => onPageChange(page+1)}
                        disable={ (page + 1) > pages }
                    />
                    <OptionButton 
                        size={'h-[25px] w-[30px]'} 
                        icon={<ChevronsRight className="size-4"/>}
                        onClick={() => onPageChange(pages)}
                        disable={ page === pages }
                    />
                </div>

            </div>
        </div>
    );
}