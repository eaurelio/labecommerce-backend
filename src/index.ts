// Configuração do projeto
import  express, { Request, Response} from 'express'
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
// Dados da aplicação
import { users, products, pucharses } from './database';
import { user, product, pucharse, Categories } from './types/types'; 
import { db } from './database/knex';


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
// app.get('/users', (req: Request, res: Response) => {
//   try {
//     res
//       .status(200)
//       .send(users)
//   } catch(error){
//     console.log(error)
//     if(res.statusCode === 200) {
//         res.status(500)
//       }
//       if(error instanceof Error) {
//         res.send(error.message)
//       }else {
//         res.send('Erro inesperado')
//       }
//     }
// })

app.get('/users', async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`
      SELECT * FROM users
    `)
    res
      .status(200)
      .send(result)

  } catch(error){
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

// Create user
// app.post('/users', (req: Request, res: Response) => {
//   try{
//     const {id, email, password} :user = req.body 
//     const newUser = {id, email, password}

//     if(!id) {
//       res
//         .status(400)
//         throw new Error('A id deve ser infomada')
//     }
//     if(id !== undefined) {
//       const existId = users.find(user => user.id === id)
//       if(existId) {
//         res
//           .status(400)
//           throw new Error('A id informada já existe')
//       }
//     }
//     if(!email) {
//       res
//         .status(400)
//         throw new Error('Email deve ser informado!')
//     }
//     if(typeof email !== 'string') {
//       res
//         .status(400)
//         throw new Error('O email deve ser do tipo String')
//     }
//     if(email !== undefined) {
//       const existEmail = users.find(user => user.email === email)
//       if(existEmail) {
//         res.status(400)
//         throw new Error('Email já existente')
//       }
//     }
//     users.push(newUser)
//     res
//       .status(201)
//       .send(`Usuário ${email} cadastrado!`)
//   } catch(error){
//     console.log(error)
//     if(res.statusCode === 200) {
//         res.status(500)
//       }
//       if(error instanceof Error) {
//         res.send(error.message)
//       }else {
//         res.send('Erro inesperado')
//       }
//     }
// })

app.post('/users', async (req: Request, res: Response) => {
  try {
    // const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const createdAt = req.body.createdAt;

    if (name.length < 3) {
      res
        .status(400)
        throw new Error ('Preencha o name corretamente!')
    }

    const [isEmailCreated] = await db.raw(`
      SELECT * FROM users
      WHERE email like "${email}"
    `)
    if(isEmailCreated) {
      res
        .status(400)
        throw new Error ('Email já cadastrado!')
    }

    if(password.length < 8) {
      res
        .status(400)
        throw new Error ('password deve ter pelo menos 8 caracteres!')
    }

    res
      .status(200)
      .send()


  } catch(error){
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
  try {
    const userId = req.params.id
    const newEmail = req.body.email
    const newPassword = req.body.password

    const user = users.find(user => user.id === userId)

    if(!user) {
      res
        .status(400)
        throw new Error('Usuário não encontrado!')
    }

    if(newEmail !== undefined) {
      if(typeof newEmail !== 'string'){
        res
          .status(400)
          throw new Error('O email deve ser do tipo String')
      }
    }
    if(newPassword !== undefined) {
      if(typeof newPassword !== 'string'){
        res
          .status(400)
          throw new Error('A deve ser do tipo String')
      }
    }

    if(user) {
      user.email = newEmail || user.email
      user.password = newPassword || user.password
    }
    res
      .status(200)
      .send('Usuário alterado!')

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
// Delete user by id
app.delete('/users/:id', (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const userIndex = users.findIndex(user => user.id === userId)

    if(userIndex === -1) {
      res
        .status(400)
        throw new Error('Usuário não encontrado!')
    }
    else if(userIndex >= 0) {
      users.splice(userIndex, 1)
    }
    res
      .status(200)
      .send('Usuário excluído')
    } catch(error){
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

//----------------------------------Products----------------------------------
// Get All Products
// app.get('/products', (req: Request, res: Response) => {
//   try{
//     res
//     .status(200)
//     .send(products)
//   } catch(error){
//     console.log(error)
//     if(res.statusCode === 200) {
//         res.status(500)
//       }
//       if(error instanceof Error) {
//         res.send(error.message)
//       }else {
//         res.send('Erro inesperado')
//       }
//     }
// })
app.get('/products', async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`
      SELECT * FROM products
    `)
    res
      .status(200)
      .send(result)
  } catch(error){
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

// Search product by name
// app.get('/products/search', (req: Request, res: Response) => {
//   try{
//     const q = req.query.q as string

//     if(q.length === 0) {
//       // console.log('ne')
//       res
//         .status(400)
//         throw new Error('A query deve ter pelo menos um caractere')
//     }

//     const search = products.filter(product => product.name.toLocaleLowerCase().includes(q.toLowerCase()))
//     res
//       .status(200)
//       .send(search)
//   } catch(error){
//     console.log(error)
//     if(res.statusCode === 200) {
//         res.status(500)
//       }
//       if(error instanceof Error) {
//         res.send(error.message)
//       }else {
//         res.send('Erro inesperado')
//       }
//     }
// })
app.get('/products/search/', async (req: Request, res: Response) => {
  try {
    const query = req.query.q;

    if (query?.length === 0) {
      res
        .status(400)
        throw new Error('Informe pelo menos um caractere para a busca!')
    }
    const [result] = await db.raw(`
      SELECT * FROM products
      WHERE name like "%${query}%"
    `)

    if(!result) {
      res
        .status(400)
        throw new Error('Produto não localizado!')
    }

    res
      .status(200)
      .send(result)

  } catch(error){
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
  try {
    const id = req.params.id;
    const findProduct = products.find(product => product.id === id)
    if(!findProduct) {
      res
        .status(400)
        throw new Error('Produto não encontrado!')
    }
    res
      .status(200)
      .send(findProduct)
    
  } catch(error){
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

// Edit product by id
app.put('/products/:id', (req: Request, res: Response) => {
  try {
    const productId = req.params.id
    const newName = req.body.name
    const newPrice = req.body.price
    const newCategory = req.body.category

    const product = products.find(product => product.id === productId)

    if(!product) {
      res
        .status(400)
        throw new Error('Produto não encontado!')
    }

    if(newName != undefined) {
      if(typeof newName !== 'string'){
        res
          .status(400)
          throw new Error('O nome deve ser uma String')
      }
    }

    if(newPrice != undefined) {
      if(typeof newPrice !== 'number'){
        res
          .status(400)
          throw new Error('O preço deve ser um number')
      }
    }

    if(product) {
      product.name = newName || product.name
      product.price = isNaN(newPrice) ? product.price : newPrice
      product.category = newCategory || product.category
    }
    res
      .status(200)
      .send('Produto alterado!')

  } catch(error){
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

// Delete product by id
app.delete('/products/:id', (req: Request, res: Response) => {
  try {
    const productId = req.params.id
    const indexProduct = products.findIndex(product => product.id === productId)
    if(indexProduct >= 1) {
      products.splice(indexProduct, 1)
    }
    res
      .status(201)
      .send('Produto excluído!')
  } catch(error){
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


//----------------------------------Pucharses----------------------------------
// Get user Pucharses by User id
app.get('/users/:id/pucharses/', (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const pucharse = pucharses.find(pucharse => pucharse.userId === userId)

    if(!pucharse) {
      res
        .status(400)
        throw new Error('Nenhuma compra pro usuário informado!')
    }
    const findPucharses = pucharses.filter(pucharse => pucharse.userId === userId)
    res
      .status(200)
      .send(findPucharses)
  } catch(error){
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

  } catch(error){
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