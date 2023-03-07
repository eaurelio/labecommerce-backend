export enum Categories {
  KEYBOARD = 'Teclados',
  ELETRIC_GUITAR = 'Guitarras',
  ACOUSTIC_GUITAR = 'Violões',
  BASS = 'Baixos',
  AMP = 'Amplificadores',
  EFFECTS_PROCESSOR = 'Processadores de efeito',
  ACCESSORIES = 'Acessórios'
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
  category: Categories
}

export type pucharse = {
  userId: string,
  productId: string,
  quantity: number,
  totalPrice: number,
}