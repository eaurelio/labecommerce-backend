export enum Categories {
  HARDWARE = 'hardware',
  SOFTWARE = 'software',
  ACESSORIOS = 'acessorios',
  PERIFERICOS = 'perifericos'
}

export type user = {
  id: string,
  email: string,
  password: string
} 

export type product = {
  id: string,
  name: string,
  price: number,
  description: Categories
  imageUrl: string
}

export type pucharse = {
  userId: string,
  productId: string,
  quantity: number,
  totalPrice: number,
}