import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useHookFormMask } from 'use-mask-input';
import { useUpdateClient } from '@/hooks/ClientQuerys';
import { useRefetch } from '@/hooks/useRefetch';
import { useUuid } from '@/hooks/useClientUuid';
import { Client } from '@/@types';

const updateClientSchema = z.object({
    uuid: z.string(),
    nome: z.string().optional().nullable()
      .refine((value) => !value || value.length >= 3, {
        message: 'Nome muito curto',
      }),
    sobrenome: z.string().optional().nullable()
      .refine((value) => !value || value.length >= 3, {
        message: 'Sobrenome muito curto',
      }),
    email: z.string().optional().nullable()
      .refine((value) => !value || /\S+@\S+\.\S+/.test(value), {
        message: 'E-mail inválido',
      }),
    aniversario: z.string().optional().nullable()
      .refine((value) => !value || /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(value), {
        message: 'Data inválida',
      }),
    telefone: z.string().optional().nullable()
      .refine((value) => !value || /^\(\d{2}\) \d{5}-\d{4}$/.test(value), {
        message: 'Telefone inválido',
      }),
  });
  
  type UpdateClientSchema = z.infer<typeof updateClientSchema>;
  
  export function EditClientForm() {
    const { refetch } = useRefetch();
    const methods = useForm<UpdateClientSchema>({
      resolver: zodResolver(updateClientSchema),
      defaultValues: { uuid: useUuid() }
    });
  
    const { register, handleSubmit, control, formState: { errors } } = methods;
  
    const registerWithMask = useHookFormMask(register);
  
    const { mutate } = useUpdateClient();
  
    const handleUpdateClient = async (data: UpdateClientSchema) => {
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined && value !== null && value !== '')
      );
    
      const finalData: Partial<Client> & { uuid: string } = {
        uuid: data.uuid,
        ...filteredData
      };
    
      mutate(finalData, {
        onSuccess: () => { if (refetch) refetch(); }
      });
    };
  
    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleUpdateClient)} className="space-y-4">
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
          <div className='flex flex-row gap-4'>
            <FormField
              control={control}
              name="aniversario"
              render={() => (
                <FormItem>
                  <Label>Data de Nascimento</Label>
                  <FormControl>
                    <Input 
                      type="text" 
                      {...registerWithMask("aniversario", '99/99/9999')}
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
                      {...registerWithMask("telefone", '(99) 99999-9999')}
                      className="mt-1 block"
                    />
                  </FormControl>
                  {errors.telefone && <FormMessage>{errors.telefone.message}</FormMessage>}
                </FormItem>
              )}
            />
          </div>
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
  }