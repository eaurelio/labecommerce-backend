import { Categories } from "./types/types"
import { 
  users,
  products,
  pucharses,
  createUser,
  getAllUsers,
  createProduct,
  getAllProducts,
  getProductById,
  queryProductsByName,
  createPurchase,
  getAllPurchasesFromUserId
} from "./database"


const application = process.argv[2]
console.log(`A aplicação '${application}' foi iniciada...`)

// Printing data
console.table(users)
console.table(products)
console.table(pucharses)

// Handle Users
createUser('256', 'gatinha_@mail.com', '98653241785')
getAllUsers()

// Handle Products
createProduct('4', 'Corda para guitarra NIG 009', 45, Categories.ACCESSORIES)
console.table(getAllProducts())
console.table(getProductById('3'))
console.log(queryProductsByName('Gui'))

// Handle Pucharses
createPurchase('1', '4', 1, 2250)
console.log(getAllPurchasesFromUserId('1'))
