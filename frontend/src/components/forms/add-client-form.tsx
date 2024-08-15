import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
    FormControl, FormField, FormItem, FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useHookFormMask } from 'use-mask-input';
import { useCreateClient } from '@/hooks/ClientQuerys';
import { useRefetch } from '@/hooks/useRefetch';

const createClientSchema = z.object({
  nome: z.string().min(3, {message: 'Nome muito curto'}),
  sobrenome: z.string().min(3, {message: 'Sobrenome muito curto'}),
  email: z.string().email({message: 'E-mail inválido'}),
  aniversario: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, { message: "Data inválida" }),
  telefone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, { message: "Telefone inválido" })
});

type CreateClienteSchema = z.infer<typeof createClientSchema>;

export function AddClientForm() {
  const { refetch } = useRefetch();
  const methods = useForm<CreateClienteSchema>({
    resolver: zodResolver(createClientSchema),
  });

  const { 
    register, handleSubmit, control, formState: { errors } 
} = methods;

  const registerWithMask = useHookFormMask(register);

  const { mutate } = useCreateClient();

  const handleCreateClient = async (data: CreateClienteSchema) => {
    mutate(data,{
        onSuccess: () => {if (refetch) refetch()}
    });
  };

  return (
    <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleCreateClient)} className="space-y-4">
            <FormField
                control={control}
                name="nome"
                render={() => (
                    <FormItem>
                        <Label>Nome</Label>
                        <FormControl>
                            <Input 
                            type="text" 
                            {...register("nome")} 
                            className="mt-1 block w-full"
                            />
                        </FormControl>
                        {errors.nome && <FormMessage>{errors.nome.message}</FormMessage>}
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="sobrenome"
                render={() => (
                    <FormItem>
                        <Label>Sobrenome</Label>
                        <FormControl>
                            <Input
                            type="text"
                            {...register("sobrenome")} 
                            className="mt-1 block w-full" 
                            />
                        </FormControl>
                        {errors.sobrenome && <FormMessage>{errors.sobrenome.message}</FormMessage>}
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="email"
                render={() => (
                    <FormItem>
                        <Label>Email</Label>
                        <FormControl>
                            <Input 
                            type="email" 
                            {...register("email")} 
                            className="mt-1 block"
                            />
                        </FormControl>
                        {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="aniversario"
                render={() => (
                    <FormItem>
                        <Label>Data de Nascimento</Label>
                        <FormControl>
                            <Input 
                            type="text" 
                            {...registerWithMask("aniversario", '99/99/9999', {
                                required: true
                              })}
                            className="mt-1 block"
                            />
                        </FormControl>
                        {errors.aniversario && <FormMessage>{errors.aniversario.message}</FormMessage>}
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="telefone"
                render={() => (
                    <FormItem>
                        <Label>Telefone</Label>
                        <FormControl>
                            <Input 
                            type="text" 
                            {...registerWithMask("telefone", '(99) 99999-9999', {
                                required: true
                              })}
                            className="mt-1 block"
                            />
                        </FormControl>
                        {errors.telefone && <FormMessage>{errors.telefone.message}</FormMessage>}
                    </FormItem>
                )}
            />

            <DialogFooter>
                <DialogClose asChild>
                    <Button type='button' variant='outline'>
                        Cancelar
                    </Button>
                </DialogClose>
                    <Button type="submit">Salvar</Button>
            </DialogFooter>
        </form>
    </FormProvider>
  );
};
