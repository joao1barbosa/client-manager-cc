'use client'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { MyButton } from "./ui/my-button";
import { useState, useEffect } from "react";

interface PaginationProps {
    pages: number;
    page: number;
    items: number;
    onPageChange: (page: number) => void;
    qtdAtual: number;
}

export function Pagination({pages, page, items, onPageChange, qtdAtual}: PaginationProps){
    const [isMobile, setIsMobile] = useState(false);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

    return (
        <div className="flex flex-shrink-0 text-sm items-center justify-between my-3">
            <span className="flex flex-row">
                {isMobile ? '' : (<p>Apresentando</p>)}
                &nbsp;
                <p>{qtdAtual} de {items} itens</p>
            </span>
            <div className="flex items-center gap-2">
                <span className="flex flex-row">
                    {isMobile ? (<p>Pg.</p>) : (<p>Página</p>)}
                    &nbsp;
                    <p>{page} de {pages}</p>
                </span>
                <div className="space-x-1.5">
                    <MyButton 
                        size={'h-[25px] w-[30px]'} 
                        icon={<ChevronsLeft className="size-4"/>} 
                        onClick={() => onPageChange(1)}
                        disable={ page === 1 }
                    />
                    <MyButton
                        size={'h-[25px] w-[30px]'} 
                        icon={<ChevronLeft className="size-4"/>}
                        onClick={() => onPageChange(page-1)}
                        disable={ (page - 1) <= 0 }
                    />
                    <MyButton 
                        size={'h-[25px] w-[30px]'} 
                        icon={<ChevronRight className="size-4"/>}
                        onClick={() => onPageChange(page+1)}
                        disable={ (page + 1) > pages }
                    />
                    <MyButton
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