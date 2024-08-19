export interface Client {
  uuid: string
  nome: string
  sobrenome: string
  email: string
  aniversario: string
  telefone: string
}

export interface ClientResponse {
  first: number
  prev: number | null
  next: number | null
  last: number
  page: number
  pages: number
  items: number
  data: Client[]
}