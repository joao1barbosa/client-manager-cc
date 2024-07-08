    "use client"

    //@ts-ignore
    import InputMask from 'react-input-mask';
    import { FormEvent, useState, useEffect } from 'react';
    import toast, { Toaster } from 'react-hot-toast';
    import InputField from '@/components/InputField';
    import UfSelect from '@/components/UfSelect';
    import Modal from "@/components/Modal";
    import { searchCep } from '@/services/viacep';
    import { FaSearch } from "react-icons/fa";
    import { createAddress, getAddress, updateAddress } from '@/services/addresses';

    interface Props {
        uuid: string
        isOpen: boolean;
        onClose: () => void;
    }

    type AddressData = {
        cep: string;
        logradouro: string;
        unidade: string;
        complemento: string;
        bairro: string;
        localidade: string;
        uf: string;
    }

    const defaultValue: AddressData = {
        cep: '',
        logradouro: '',
        unidade: '',
        complemento: '',
        bairro: '',
        localidade: '',
        uf: '',
    };

    const notify = (message: string) => toast(message);

    export default function AddressModal({ uuid, isOpen, onClose }: Props){
        const [addressData, setAddressData] = useState<AddressData>(defaultValue);
        const [initialAddressData, setInitialAddressData] =  useState<AddressData>(defaultValue);
        const [edited, setEdited] = useState<boolean>(false);
        const [cep, setCep] = useState(initialAddressData.cep);

        //Limpa os estados quando o modal é aberto
        useEffect(() => {
            if(isOpen) {
                setEdited(false);
                setAddressData(defaultValue);
                setInitialAddressData(defaultValue);
                if (uuid) {
                    loadAddress(uuid);
                }
            }
        },[isOpen, uuid]);

        //Compara valores iniciais com o valor atual para saber se houve edição
        useEffect(() => {
            const isEdited = Object.keys(initialAddressData).some(key => 
                initialAddressData[key as keyof AddressData] !== '' &&
                initialAddressData[key as keyof AddressData] !== addressData[key as keyof AddressData]
            );
            setEdited(isEdited);
        }, [addressData, initialAddressData]);

        const loadAddress = async (uuid: string) => {
            try {
                const response = await getAddress(uuid);
                if (response) {
                    setAddressData(response);
                    setInitialAddressData(response);
                }
            } catch (error) {
                notify("Erro ao carregar endereço");
            }
        };

        const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setCep(event.target.value);
        };

        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { id, value } = event.target;
            setAddressData(prevState => ({
                ...prevState,
                [id]: value,
            }));
        };

        const buscarCEP = async () => {
            if (cep) {
                try {
                    const data = await searchCep(cep);
                    setAddressData({
                        cep: cep,
                        logradouro: data.logradouro,
                        unidade: data.unidade,
                        complemento: data.complemento,
                        bairro: data.bairro,
                        localidade: data.localidade,
                        uf: data.uf,
                    });
                } catch (error) {
                    notify("Formato errado de cep!");
                }
                return;
            }
            notify('Por favor, insira um CEP válido.');
        };

        const handleSubmit = (e: FormEvent) => {
            e.preventDefault(); 
            if (cep && !cep.includes("_")) {
                edited ? 
                    updateAddress(uuid, addressData)
                :
                    createAddress({ client_uuid: uuid, ...addressData });
                
                onClose();
                return;
            } 
            notify("Formato errado de cep!");
        }

        return(
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className="flex flex-row justify-center mb-3">
                    <h2 className="font-bold text-xl">Endereço do Cliente</h2>
                </div>
                <form noValidate onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="cep">
                            Cep:
                        </label>
                        <div className='flex flex-row space-x-1 items-center'>
                            <InputMask
                                className=" p-2 border border-gray-300 rounded"
                                id="cep"
                                type="text"
                                value={cep}
                                onChange={handleCepChange}
                                placeholder="12345678"
                                mask="99999999"
                            />
                            <button 
                                className="
                                flex justify-center items-center w-10 h-10 bg-gray-500 rounded-md hover:bg-gray-600
                                "
                                type='button'
                                onClick={buscarCEP} 
                            >
                                <FaSearch className="text-white" />
                            </button>
                        </div>
                    </div>

                    <InputField 
                        id="logradouro" type="text" label="Endereço" 
                        placeholder="Endereço" value={addressData.logradouro}
                        onChange={handleInputChange}
                    />
                    <InputField 
                        id="unidade" type="text" label="Número"
                        placeholder="Número" value={addressData.unidade}
                        onChange={handleInputChange}
                    />
                    <InputField 
                        id="complemento" type="text" label="Complemento"
                        placeholder="Complemento" value={addressData.complemento}
                        onChange={handleInputChange}
                    />
                    <InputField 
                        id="bairro" type="text" label="Bairro"
                        placeholder="Bairro" value={addressData.bairro}
                        onChange={handleInputChange}
                    />
                    <InputField 
                        id="localidade" type="text" label="Cidade"
                        placeholder="Cidade" value={addressData.localidade}
                        onChange={handleInputChange}
                    />

                    <UfSelect value={addressData.uf} onChange={handleInputChange}/>

                    <div className="flex justify-center">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-600 ml-2"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            <Toaster/>
            </Modal>
        );
    }
