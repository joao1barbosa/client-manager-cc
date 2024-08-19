export interface Address {
    cep: string
    logradouro: string
    unidade?: string
    complemento?: string
    bairro: string
    localidade: string
    uf: string
    client_uuid: string
  }