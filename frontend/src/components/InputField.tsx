//@ts-ignore
import InputMask from 'react-input-mask';

interface Props{
    id: string;
    type:string;
    label: string;
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({id, type, label, placeholder, value, onChange}: Props){
    const isBirthDay = (id ==="aniversario");
    const isFone = (id ==="telefone");

    return (
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor={id}>
                {label}:
            </label>
            {isBirthDay ? 
                <input
                    className="w-full p-2 border border-gray-300 rounded"
                    id={id}
                    type={type}
                    placeholder="DD/MM/AAAA"
                    pattern="\d{2}/\d{2}/\d{4}"
                    value={value}
                    onChange={onChange}
               />
            : isFone ?
                <InputMask
                    className="w-full p-2 border border-gray-300 rounded"
                    id={id}
                    type={type}
                    placeholder="(xx) xxxxx-xxxx"
                    mask="(99) 99999-9999"
                    value={value}
                    onChange={onChange}
                />
            :
                <input
                    className="w-full p-2 border border-gray-300 rounded"
                    id={id}
                    type={type}
                    placeholder = {placeholder}
                    value={value}
                    onChange={onChange}
                />
            }
        </div>
    );
}