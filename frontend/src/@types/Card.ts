export interface Card {
    uuid: string
    numero: string
    nome: string
    validade: string
    cvv: string
    client_uuid: string
}

export interface CardResponse {
    first: number
    prev: any
    next: any
    last: number
    page: number
    pages: number
    items: number
    data: Card[]
}