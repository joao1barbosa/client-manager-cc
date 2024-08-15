import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
    FormControl, FormField, FormItem, FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useHookFormMask } from 'use-mask-input';
import { useCreateCard } from '@/hooks/useCard';
import { usePathname } from 'next/navigation';
import Cards from 'react-credit-cards-2';
import { useState } from 'react';

const createCardSchema = z.object({
    numero: z.string().regex(/^\d{4} \d{4} \d{4} \d{4}$/, { message: "Número inválido" }),
    nome: z.string().min(3, { message: 'Nome muito curto' }),
    validade: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Data inválida" }),
    cvv: z.string().regex(/^\d{3}$/, { message: "CVV inválido" }),
});

type CreateCardSchema = z.infer<typeof createCardSchema>;

type FocusedField = 'name' | 'number' | 'expiry' | 'cvc';

export function AddCardForm() {
  const pathname = usePathname();
  const client_uuid = pathname.split('/')[1];

  const [focus, setFocus] = useState<FocusedField | undefined>('name');

  const methods = useForm<CreateCardSchema>({
    resolver: zodResolver(createCardSchema),
  });

  const { 
    register, handleSubmit, control, formState: { errors }, watch 
  } = methods;

  const registerWithMask = useHookFormMask(register);
  const { mutate } = useCreateCard();

  const handleCreateClient = async (data: CreateCardSchema) => {
    const full_data = { client_uuid, ...data };
    mutate(full_data);
  };

  const handleInputFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    const focusField = evt.target.name as FocusedField;
    setFocus(focusField);
  }

  const watchedInputs = watch();

  return (
    <div className='flex flex-col items-center space-y-4'>
        <Cards
            number={watchedInputs.numero || ''}
            expiry={watchedInputs.validade || ''}
            cvc={watchedInputs.cvv || ''}
            name={watchedInputs.nome || ''}
            focused={focus || undefined}
        />

        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleCreateClient)} className="space-y-2">
                <FormField
                    control={control}
                    name="numero"
                    render={() => (
                        <FormItem>
                            <FormControl>
                                <Input 
                                    type="text" 
                                    {...registerWithMask("numero", '9999 9999 9999 9999', {
                                        required: true
                                    })}
                                    className="mt-1 block w-3/4 p-2 text-center text-xl placeholder:text-center"
                                    placeholder='1234 1234 1234 1234'
                                    onFocus={handleInputFocus}
                                />
                            </FormControl>
                            {errors.numero && <FormMessage>{errors.numero.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="nome"
                    render={() => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="text"
                                    {...register("nome")} 
                                    className="mt-1 block w-full"
                                    onFocus={handleInputFocus} 
                                />
                            </FormControl>
                            {errors.nome && <FormMessage>{errors.nome.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                <div className='flex flex-row space-x-2'>
                    <FormField
                        control={control}
                        name="validade"
                        render={() => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        type="text" 
                                        {...registerWithMask("validade", '99/99', {
                                            required: true
                                        })}
                                        className="mt-1 block"
                                        onFocus={handleInputFocus}
                                    />
                                </FormControl>
                                {errors.validade && <FormMessage>{errors.validade.message}</FormMessage>}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="cvv"
                        render={() => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        type="text" 
                                        {...registerWithMask("cvv", '999', {
                                            required: true
                                        })}
                                        className="mt-1 block"
                                        onFocus={handleInputFocus}
                                    />
                                </FormControl>
                                {errors.cvv && <FormMessage>{errors.cvv.message}</FormMessage>}
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
    </div>
  );
};