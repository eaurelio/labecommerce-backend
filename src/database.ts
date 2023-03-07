import { 
  user,
  product,
  pucharse,
  Categories
 } from "./types/types";

// Users
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

// Products
export const products: product[] = [
  {
    id: '1',
    name: 'Teclado controlador Alesis',
    price: 2500,
    category: Categories.KEYBOARD
  },
  {
    id: '2',
    name: 'Guitarra Ibanez RG370FMZ',
    price: 3700,
    category: Categories.ELETRIC_GUITAR
  },
  {
    id: '3',
    name: 'Valeton GP-200',
    price: 1750,
    category: Categories.EFFECTS_PROCESSOR
  },
  {
    id: '4',
    name: 'Takamine Premium',
    price: 2250,
    category: Categories.ACOUSTIC_GUITAR
  }
]

// Pucharses
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

// ----------------Functions----------------
// Users
export function createUser(id:string, email:string, password:string):user | void{
  users.push({
    id: id, 
    email: email, 
    password: password
  })

  console.log('Cadastro realizado com sucesso')
}

export function getAllUsers():void {
  console.log(users)
}

// Products
export function createProduct(id:string, name:string, price:number, category:Categories):product | void {
  products.push({
      id: id,
      name: name,
      price: price,
      category: category
  })
  console.log('Produto criado com sucesso')
}

export function getAllProducts():void {
  console.log(products)
}

export function getProductById(idToSearch:string){
  return products.filter((product) => product.id === idToSearch)
}

export function queryProductsByName(query:string) {
  return products.filter(product => product.name.includes(query))
}
// Pucharses
export function createPurchase(userId: string, productId:string, quantity:number, totalPrice:number):void {
  pucharses.push(
    {
      userId: userId,
      productId: productId,
      quantity: quantity,
      totalPrice: totalPrice
    }
  )
  console.log('Compra realizada com sucesso')
}

export function getAllPurchasesFromUserId(userId:String) {
  return pucharses.filter(pucharse => pucharse.userId === userId)
}