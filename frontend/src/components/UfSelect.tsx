interface Props{
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ufs = [
    'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG','MS', 'MT',
    'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'
];

export default function UfSelect({value, onChange}: Props) {
    return(
        <div className="mb-4 flex flex-row items-center space-x-2">
            <label className="block text-sm font-bold mb-2" htmlFor="uf">
                UF: 
            </label>
            <select
                className="p-2 border border-gray-300 rounded" id='uf'
                value={value} onChange={onChange}
            >
                <option value="">...</option>
                {ufs.map(uf => (
                    <option key={uf} value={uf}>
                        {uf}
                    </option>
                ))}
            </select>
        </div>
    );
}