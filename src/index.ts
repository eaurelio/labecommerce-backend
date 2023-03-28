// Configuração do projeto
import  express, { Request, Response} from 'express'
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
// Dados da aplicação
import { users, products, pucharses } from './database';
import { user, product, pucharse, Categories } from './types/types'; 


app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

// Teste da API
app.get('/index', (req: Request, res: Response) => {
  res
    .status(200)
    .send('Aplicação em operação!')
})

//----------------------------------Users----------------------------------
// Get All users
app.get('/users', (req: Request, res: Response) => {
  res
    .status(200)
    .send(users)
})

// Create user
app.post('/users', (req: Request, res: Response) => {
  try{
    const {id, email, password} :user = req.body 
    const newUser = {id, email, password}

    if(id !== undefined) {
      const existId = users.find(user => user.id === id)
      if(existId) {
        res
          .status(400)
          throw new Error('A id informada já existe')
      }
    }
    if(email !== undefined) {
      const existEmail = users.find(user => user.email === email)
      if(existEmail) {
        res.status(400)
        throw new Error('Email já existente')
      }
    }
    users.push(newUser)
    res
      .status(201)
      .send(`Usuário ${email} cadastrado!`)
  }catch(error){
    console.log(error)
    if(res.statusCode === 200) {
        res.status(500)
      }
      if(error instanceof Error) {
        res.send(error.message)
      }else {
        res.send('Erro inesperado')
      }
    }
})

// Edit user by id
app.put('/users/:id', (req: Request, res: Response) => {
  const userId = req.params.id

  const newId = req.body.id as string | undefined
  const newEmail = req.body.email as string | undefined
  const newPassword = req.body.password as string | undefined

  const user = users.find(user => user.id === userId)

  if(user) {
    user.id = newId || user.id
    user.email = newEmail || user.email
    user.password = newPassword || user.password
  }
  res
    .status(200)
    .send('Usuário alterado!')
})
// Delete user by id
app.delete('/users/:id', (req: Request, res: Response) => {
  const userId = req.params.id
  const userIndex = users.findIndex(user => user.id === userId)

  if(userIndex >= 0) {
    users.splice(userIndex, 1)
  }
  res
    .status(200)
    .send('Usuário excluído')
})

//----------------------------------Products----------------------------------
// Get All Products
app.get('/products', (req: Request, res: Response) => {
  res
    .status(200)
    .send(products)
})
// Search product by name
app.get('/products/search', (req: Request, res: Response) => {
  try{
    const q = req.query.q as string

    if(q.length === 0) {
      // console.log('ne')
      res
        .status(400)
        throw new Error('A query deve ter pelo menos um caractere')
    }

    const search = products.filter(product => product.name.toLocaleLowerCase().includes(q.toLowerCase()))
    res
      .status(200)
      .send(search)
  }catch(error){
    console.log(error)
    if(res.statusCode === 200) {
        res.status(500)
      }
      if(error instanceof Error) {
        res.send(error.message)
      }else {
        res.send('Erro inesperado')
      }
    }
})

// Create product
app.post('/products', (req: Request, res: Response) => {
  try{
    const {id, name, price, category} :product = req.body
    const newProduct = {id, name, price, category}

    const existId = products.find(product => product.id === id)
    
    if(id !== undefined) {
      if(existId) {
        res.status(400)
        throw new Error('id do produto informado já cadastrado!')
      }
    }
    products.push(newProduct)
    res
      .status(201)
      .send(`Produto '${name}' cadastrado!`)
    
  }catch(error){
    console.log(error)
    if(res.statusCode === 200) {
        res.status(500)
      }
      if(error instanceof Error) {
        res.send(error.message)
      }else {
        res.send('Erro inesperado')
      }
    }
})

// Get Products by id
app.get('/products/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const findProduct = products.filter(product => product.id === id)
  res
    .status(200)
    .send(findProduct)
})

// Edit product by id
app.put('/products/:id', (req: Request, res: Response) => {
  const productId = req.params.id

  const newId = req.body.id as string
  const newName = req.body.name as string
  const newPrice = req.body.price as number
  const newCategory = req.body.category as Categories

  const product = products.find(product => product.id === productId)

  if(product) {
    product.id = newId || product.id
    product.name = newName || product.name
    product.price = isNaN(newPrice) ? product.price : newPrice
    product.category = newCategory || product.category
  }
  res
    .status(200)
    .send('Produto alterado!')
})

// Delete product by id
app.delete('/products/:id', (req: Request, res: Response) => {
  const productId = req.params.id
  const indexProduct = products.findIndex(product => product.id === productId)
  if(indexProduct >= 1) {
    products.splice(indexProduct, 1)
  }
  res
    .status(201)
    .send('Produto excluído!')
})

//----------------------------------Pucharses----------------------------------
// Get user Pucharses by User id
app.get('/users/:id/pucharses/', (req: Request, res: Response) => {
  const userId = req.params.id
  const findPucharses = pucharses.filter(pucharse => pucharse.userId === userId)
  res
    .status(200)
    .send(findPucharses)
})

// Create pucharse
app.post('/pucharses', (req: Request, res: Response) => {
  try{
    const {userId, productId, quantity, totalPrice} = req.body
    const newPucharse = {userId, productId, quantity, totalPrice}

    const existUserId = users.find(user => user.id === userId)
    const existProductId = products.find(product => product.id === productId)

    if(userId !== undefined) {
      if(!existUserId) {
        res.status(400)
        throw new Error('Usuário informado não está cadastrado!')
      }
    }
    if(productId !== undefined) {
      if(!existProductId) {
        res.status(400)
        throw new Error('Produto informado não está cadastrado!')
      }
    }
    if(existProductId !== undefined) {
      const pTotalPrice = existProductId.price * quantity
      if(totalPrice !== pTotalPrice){
        res.status(400)
        throw new Error('O valor total da compra incorreto!')
      }
    }

    pucharses.push(newPucharse)
    res
      .status(201)
      .send(`Compra realizada com sucesso! Valor total: R$ ${totalPrice}`)
  }catch(error){
    console.log(error)
    if(res.statusCode === 200) {
        res.status(500)
      }
      if(error instanceof Error) {
        res.send(error.message)
      }else {
        res.send('Erro inesperado')
      }
    }
})