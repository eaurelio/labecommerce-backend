// Configuração do projeto
import  express, { Request, Response} from 'express'
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
// Dados da aplicação
import { users, products, pucharses } from './database';
import { user, product, pucharse } from './types/types'; 


app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

// Teste da API
app.get('/index', (req: Request, res: Response) => {
  res
    .status(200)
    .send('Aplicação em operação')
})

//----------------------------------Retrieving data----------------------------------
// Get All users
app.get('/users', (req: Request, res: Response) => {
  res
    .status(200)
    .send(users)
})
// Get All Products
app.get('/products', (req: Request, res: Response) => {
  res
    .status(200)
    .send(products)
})
// Search product by name
app.get('/products/search', (req: Request, res: Response) => {
  const q = req.query.q as string
  const search = products.filter(product => product.name.toLocaleLowerCase().includes(q.toLowerCase()))

  res
    .status(200)
    .send(search)
})

//----------------------------------Creating data----------------------------------
// Create user
app.post('/users', (req: Request, res: Response) => {
  const {id, email, password} :user = req.body 
  const newUser = {id, email, password}
  users.push(newUser)
  res
    .status(201)
    .send('Usuário cadastrado!')
    // .send(users)
})
// Create product
app.post('/products', (req: Request, res: Response) => {
  const {id, name, price, category} :product = req.body
  const newProduct = {id, name, price, category}
  products.push(newProduct)
  res
    .status(201)
    .send('Produco cadastrado!')
    // .send(products)
})
// Create pucharse
app.post('/pucharses', (req: Request, res: Response) => {
  const {userId, productId, quantity, totalPrice} = req.body
  const newPucharse = {userId, productId, quantity, totalPrice}
  pucharses.push(newPucharse)
  res
    .status(201)
    .send('Compra realizada com sucesso!')
    // .send(pucharses)
})