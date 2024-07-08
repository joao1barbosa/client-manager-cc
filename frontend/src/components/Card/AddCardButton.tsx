interface Props{
    onClick: () => void;
}

export default function AddCardButton({ onClick }: Props){
    return (
        <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={onClick}
        >
            Adicionar Cartão
        </button>
    );
}