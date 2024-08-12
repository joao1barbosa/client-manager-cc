'use client'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { MyButton } from "../ui/my-button";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { MyInput } from "../input/my-input";
import { Form } from "@/components/ui/form";
import { zodResolver } from '@hookform/resolvers/zod';

const createClientSchema = z.object({
    nome: z.string().min(3, {message: 'Nome muito curto'}),
    // sobrenome: z.string().min(3, {message: 'Sobrenome muito curto'}),
    // email: z.string().email({message: 'E-mail inválido'}),
});

type CreateClienteSchema = z.infer<typeof createClientSchema>;

export function AddDialog(){
    const { register, handleSubmit, control } = useForm<CreateClienteSchema>({
        resolver: zodResolver(createClientSchema),
        defaultValues: {
            nome: '',
            // sobrenome: 'barbosa',
            // email: 'joao@email.com',
        }
    });

    function handleCreateClient(data: CreateClienteSchema){
        console.log("Form: ", data);
    }

    function handleError(errors: any) {
        console.error('Erros de validação:', errors);  // Verifique se há erros de validação
    }

    return(
        <Dialog>
            <DialogTrigger asChild>
                <MyButton icon={<Plus/>}/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dialog">
                <DialogHeader>
                <DialogTitle>Adicionar Cliente</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleCreateClient, handleError)} className="grid gap-4 py-4">
                    <MyInput id='nome' label="Nome" {...register('nome')}/>
                    {/* <MyInput
                        id='sobrenome'
                        label="Sobrenome"
                        placeholder="Silva"
                        type='text'
                        {...register('sobrenome')}
                    />
                    <MyInput
                        id='email'
                        label="E-mail"
                        placeholder="roberto@example.com"
                        type="email"
                        {...register('email')}
                    /> */}
                

                {/* <div className="grid gap-4 py-4">
                    <MyInput id='nome' label="Nome" placeholder="Roberto"/>
                    <MyInput id='sobrenome' label='Sobrenome' placeholder="Carvalho"/>
                    <MyInput id='email' label='Email' type='email' placeholder='roberto@email.com'/>
                    <MaskedInput label='Telefone' type='text' registerName="telefone" maskName="phone"/>
                </div> */}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type='button' variant='outline'>
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button type="submit">Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}