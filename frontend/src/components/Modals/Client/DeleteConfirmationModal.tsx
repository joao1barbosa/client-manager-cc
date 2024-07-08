import Modal from "../Modal";

interface Props{
    uuid: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function DeleteConfirmationModal({ uuid, isOpen, onClose }: Props){
  const haddleDelete = (uuid: string) => {
    //deletar no bd
    onClose();
  }

  return(
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-row justify-center mb-6">
        <h2 className="font-bold text-xl">Tem certeza que deseja apagar o registo do cliente?</h2>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-800 ml-2"
          onClick={()=>haddleDelete(uuid)}
        >
          Deletar
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </Modal>
  );
}