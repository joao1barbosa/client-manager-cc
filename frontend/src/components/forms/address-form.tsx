import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useHookFormMask } from 'use-mask-input';
import { useReadAddress, useUpdateAddress } from '@/hooks/AddressQuerys';
import { useUuid } from '@/hooks/useClientUuid';
import { searchCep } from '@/lib/viacep';
import { useEffect } from 'react';
import { Search } from 'lucide-react';
import { MyButton } from '../ui/my-button';

const updateAddressSchema = z.object({
  cep: z.string().length(8, { message: 'CEP inválido' }),
  logradouro: z.string().min(1, { message: 'Logradouro é obrigatório' }),
  unidade: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().min(1, { message: 'Bairro é obrigatório' }),
  localidade: z.string().min(1, { message: 'Localidade é obrigatória' }),
  uf: z.string().length(2, { message: 'UF inválida' }),
});

type UpdateAddressSchema = z.infer<typeof updateAddressSchema>;

export function AddressForm() {
  const uuid = useUuid();
  const { mutate } = useUpdateAddress();

  const { data: addressResponse } = useReadAddress(uuid);
  
  const methods = useForm<UpdateAddressSchema>({
    resolver: zodResolver(updateAddressSchema),
    defaultValues: {
      cep: '',
      logradouro: '',
      unidade: '',
      complemento: '',
      bairro: '',
      localidade: '',
      uf: '',
    },
  });

  const { register, handleSubmit, control, setValue, formState: { errors } } = methods;

  const registerWithMask = useHookFormMask(register);

  const handleUpdateAddress = async (data: UpdateAddressSchema) => {
    mutate({ ...data, client_uuid: uuid });
  };

  const handleCepSearch = async () => {
    const cep = methods.getValues('cep');
    if (cep) {
      try {
        const data = await searchCep(cep);
        setValue('logradouro', data.logradouro);
        setValue('unidade', data.unidade || '');
        setValue('complemento', data.complemento || '');
        setValue('bairro', data.bairro);
        setValue('localidade', data.localidade);
        setValue('uf', data.uf);
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
      }
    }
  };

  useEffect(() => {
    if(addressResponse){
        setValue('cep', addressResponse.cep)
        setValue('logradouro', addressResponse.logradouro);
        setValue('unidade', addressResponse.unidade || '');
        setValue('complemento', addressResponse.complemento || '');
        setValue('bairro', addressResponse.bairro);
        setValue('localidade', addressResponse.localidade);
        setValue('uf', addressResponse.uf);
    }
  }, [addressResponse, setValue]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleUpdateAddress)} className="space-y-4">
        <FormField
          control={control}
          name="cep"
          render={() => (
            <FormItem>
              <Label>CEP</Label>
              <FormControl>
                <div className='grid grid-cols-6 gap-4 w-full'>
                <div className="col-span-5 flex justify-center items-center">
                    <Input
                    type="text"
                    {...registerWithMask("cep", '99999999')}
                    className="block w-full"
                    />
                </div>
                <div className="col-span-1 flex justify-center items-center">
                  <Button className={`my-button w-full h-full`} size="icon" 
                    variant='outline' onClick={handleCepSearch} type='button'
                  >
                    <Search/>
                  </Button>
                </div>
                </div>
              </FormControl>
              {errors.cep && <FormMessage>{errors.cep.message}</FormMessage>}
            </FormItem>
          )}
        />
        <div className='grid grid-cols-11 gap-4 w-full'>
            <FormField
            control={control}
            name="logradouro"
            render={() => (
                <FormItem className="col-span-7">
                <Label>Logradouro</Label>
                <FormControl>
                    <Input
                    type="text"
                    {...register("logradouro")}
                    className="mt-1 block w-full"
                    />
                </FormControl>
                {errors.logradouro && <FormMessage>{errors.logradouro.message}</FormMessage>}
                </FormItem>
            )}
            />
            <FormField
            control={control}
            name="unidade"
            render={() => (
                <FormItem className="col-span-4">
                <Label>Unidade</Label>
                <FormControl>
                    <Input
                    type="text"
                    {...register("unidade")}
                    className="mt-1 block w-full"
                    />
                </FormControl>
                {errors.unidade && <FormMessage>{errors.unidade.message}</FormMessage>}
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={control}
          name="complemento"
          render={() => (
            <FormItem>
              <Label>Complemento</Label>
              <FormControl>
                <Input
                  type="text"
                  {...register("complemento")}
                  className="mt-1 block w-full"
                />
              </FormControl>
              {errors.complemento && <FormMessage>{errors.complemento.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="bairro"
          render={() => (
            <FormItem>
              <Label>Bairro</Label>
              <FormControl>
                <Input
                  type="text"
                  {...register("bairro")}
                  className="mt-1 block w-full"
                />
              </FormControl>
              {errors.bairro && <FormMessage>{errors.bairro.message}</FormMessage>}
            </FormItem>
          )}
        />
        <div className='grid grid-cols-5 gap-4 w-full'>
            <FormField
            control={control}
            name="localidade"
            render={() => (
                <FormItem className="col-span-4">
                <Label>Localidade</Label>
                <FormControl>
                    <Input
                    type="text"
                    {...register("localidade")}
                    className="mt-1 block w-full"
                    />
                </FormControl>
                {errors.localidade && <FormMessage>{errors.localidade.message}</FormMessage>}
                </FormItem>
            )}
            />
            <FormField
            control={control}
            name="uf"
            render={() => (
                <FormItem className="col-span-1">
                <Label>UF</Label>
                <FormControl>
                    <Input
                    type="text"
                    {...register("uf")}
                    className="mt-1 block w-full"
                    />
                </FormControl>
                {errors.uf && <FormMessage>{errors.uf.message}</FormMessage>}
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