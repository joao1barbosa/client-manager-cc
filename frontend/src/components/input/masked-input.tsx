import { Control, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { ChangeEvent } from 'react';
import { normalizePhoneNumber } from "../../lib/maskNormalizer";

interface MaskedInputProps {
    label?: string
    type: string
    placeholder?: string
    control?: Control<any>
    registerName: string
    maskName?: 'phone'
}

export const MaskedInput = ({ label, type, placeholder, control, registerName, maskName }: MaskedInputProps) => {
  
  const { setValue } = useFormContext();
  
  const phoneMask = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const newValue = maskName === name ? normalizePhoneNumber(value) : value
    setValue(name, newValue)
  }

  return (
    <FormField
      control={control}
      name={registerName}
      render={({ field }) => (
        <FormItem className="grid grid-cols-4 items-center gap-4">
          <FormLabel htmlFor={registerName} className="text-right">
            {label}
          </FormLabel>
            <FormControl onChange={phoneMask}>
              <Input
                id={registerName}
                data-mask={maskName}
                placeholder={placeholder}
                {...field}
                type={type}
                autoComplete="off"
                className="col-span-3"
              />
            </FormControl>
          <FormMessage className='text-rose-400 font-normal text-xs pt-1' />
        </FormItem>
      )}
    />
  )
}