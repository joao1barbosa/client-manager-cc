import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputHTMLAttributes } from "react";

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
}

export function MyInput({ id, label,  ...rest}: MyInputProps){
    console.log('Props:', { id, label, rest });

    return(
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={id} className="text-right">
                {label}
            </Label>
            <Input
                className="col-span-3"
                id={id}
                {...rest}
            />
        </div>
    );
}