import { user, product, pucharse } from "./types/types";

export const users: user[] = [
  {
    id: "1",
    email: "edson.exe@outlook.com",
    password: "654987321"
  },
  {
    id: "2",
    email: "giani@outlook.com",
    password: "321654987"
  },
  {
    id: "3",
    email: "melina@outlook.com",
    password: "987654321"
  }
]

export const products: product[] = [
  {
    id: '1',
    name: 'Teclado controlador Alesis',
    price: 2500,
    category: 'Instrumento musical'
  },
  {
    id: '2',
    name: 'Guitarra Ibanez RG370FMZ',
    price: 3700,
    category: 'Instrumento musical'
  },
  {
    id: '3',
    name: 'Valeton GP-200',
    price: 1750,
    category: 'Processador de efeitos'
  }
]

export const pucharses: pucharse[] = [
  {
    userId: '1',
    productId: '1',
    quantity: 1,
    totalPrice: 2500,
  },
  {
    userId: '1',
    productId: '2',
    quantity: 1,
    totalPrice: 3700,
  },
  {
    userId: '1',
    productId: '3',
    quantity: 1,
    totalPrice: 1750,
  },

]