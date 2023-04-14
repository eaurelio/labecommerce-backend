// Configuração do projeto
import  express, { Request, Response} from 'express'
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
// Dados da aplicação
// import { users, products, pucharses } from './database';
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

app.post('/users', async (req: Request, res: Response) => {
  try {
    const {id, name, email, password, createdAt} = req.body;

    const [isIdCreated] = await db.raw(`
      SELECT * FROM users
      WHERE id = "${id}"
    `)

    if(id !== undefined) {
      if(isIdCreated) {
        res.status(400)
        throw new Error('id já cadastrada!')
      }
    } else {
      res.status(400)
      throw new Error('Informe a id')
    }


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

    await db.raw(`
      INSERT INTO users (id, name, email, password, createdAt)
      VALUES
        ("${id}", "${name}","${email}","${password}", "${createdAt}")
    `)

    res
      .status(201)
      .send("Cadastro realizado com sucesso!")


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
app.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const {name, email, password} = req.body;

    const [isIdCreated] = await db.raw(`
      SELECT * FROM users
      WHERE id = "${id}"
    `)

    if(!isIdCreated) {
      res
        .status(400)
        throw new Error('Usuário não encontrado!')
    }

    if(!name || name.length < 3) {
      res
        .status(400)
        throw new Error('name deve ser informado corretamente')
    }

    if(!email) {
      res
        .status(400)
        throw new Error('O email deve ser informado')
    }

    if(typeof email !== 'string'){
      res
        .status(400)
        throw new Error('O email deve ser do tipo String')
    }

    if(!password) {
      res
      .status(400)
      throw new Error('password não informado')
    }
    if(typeof password !== 'string'){
      res
        .status(400)
        throw new Error('A senha deve ser do tipo String')
    }

    await db.raw(`
      UPDATE users
      SET name = "${name}", email = "${email}", password = "${password}"
      WHERE id = "${id}"
    `)
    res
      .status(200)
      .send('Usuário alterado!')

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
// Delete user by id
app.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id

    const [isIdCreated] = await db.raw(`
      SELECT * FROM users
      WHERE id = "${userId}"
    `)

    if(!isIdCreated) {
      res
        .status(400)
        throw new Error('Usuário (id) não localizado!')
    }

    await db.raw(`
      DELETE FROM USERS
      WHERE id = "${userId}"
    `)

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
app.post('/products', async (req: Request, res: Response) => {
  try{
    const {id, name, price, description, imageUrl} :product = req.body

    const [existId] = await db.raw(`
      SELECT * FROM products
      WHERE id = "${id}"
    `)
    
    if(id !== undefined) {
      if(existId) {
        res.status(400)
        throw new Error('id do produto informado já cadastrado!')
      }
    }

    if(name.length < 3) {
      res
        .status(400)
        throw new Error('Informe um nome válido!')
    }
    if (!price) {
      res
        .status(400)
        throw new Error('price deve ser informado!')
    }
    if (typeof price !== 'number') {
      res
        .status(400)
        throw new Error('price deve ser numérico!')
    }
    if (!description) {
      res
        .status(400)
        throw new Error('description deve ser informada!')
    }
    if (!imageUrl) {
      res
        .status(400)
        throw new Error('imageUrl deve ser informada!')
    }

    await db.raw(`
      INSERT INTO products (id, name, price, description, imageUrl)
      VALUES("${id}","${name}","${price}","${description}","${imageUrl}");
    `)

    res
      .status(201)
      .send("Produto cadastrado com sucesso")
    
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
app.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    const [isIdCreated] = await db.raw(`
      SELECT * FROM products
      WHERE id = "${id}"
    `)

    if(!isIdCreated) {
      res
        .status(400)
        throw new Error('Produto não encontrado!')
    }
    res
      .status(200)
      .send(isIdCreated)
    
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
app.put('/products/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const {name, price, description, imageUrl} = req.body

    const [isIdCreated] = await db.raw(`
      SELECT * FROM products
      WHERE id = "${id}"
    `)

    if(!isIdCreated) {
      res
        .status(400)
        throw new Error('Produto não encontado!')
    }

    if(name != undefined) {
      if(typeof name !== 'string'){
        res
          .status(400)
          throw new Error('O nome deve ser uma String')
      }
    }

    if(price != undefined) {
      if(typeof price !== 'number'){
        res
          .status(400)
          throw new Error('O preço deve ser um number')
      }
    }

    if(description !== undefined) {
      if(typeof description !== 'string') {
        res.status(400)
        throw new Error('description deve ser uma string')
      }
    }

    const newName = name || isIdCreated.name
    const newPrice = price || isIdCreated.price
    const newDescription = description || isIdCreated.description
    const newImg = imageUrl || isIdCreated.imageUrl

    await db.raw(`
      UPDATE products
      SET name = "${newName}", price = "${newPrice}", description = "${newDescription}", imageUrl = "${newImg}"
      WHERE id = "${id}"
    `)

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
app.delete('/products/:id', async (req: Request, res: Response) => {
  try {
    const productId = req.params.id

    const [isIdCreated] = await db.raw(`
      SELECT * FROM products
      WHERE id = "${productId}"
    `)

    if(!isIdCreated) {
      res.status(400)
      throw new Error('produto não encontrado')
    }

    await db.raw(`
      DELETE FROM products
      WHERE id = "${productId}"
    `)

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
// Get all pucharses

app.get('/pucharses', async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`
      SELECT * from pucharses
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


// Get user Pucharses by User id
app.get('/users/:id/pucharses/', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id

    const [isIdCreated] = await db.raw(`
      SELECT * FROM users
      WHERE id = "${userId}"
    `)

    if(!isIdCreated) {
      res.status(400)
      throw new Error('id do usuário não encontrada')
    }

    const [pucharses] = await db.raw(`
      SELECT * FROM pucharses
      WHERE buyer_id = "${userId}"
    `)

    if(!pucharses) {
      res.status(400)
      throw new Error('não foram encontradas compras para o usuário informado')
    }

    res
      .status(200)
      .send(pucharses)

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
app.post('/pucharses', async (req: Request, res: Response) => {
  try{
    const {id, buyer, totalPrice, createdAt, paid} = req.body

    const [existsId] = await db.raw(`
      SELECT * FROM pucharses
      WHERE id = ${id}
    `)
    const [existsBuyer] = await db.raw(`
      SELECT * FROM users
      WHERE id = ${buyer}
    `)

    if(id !== undefined) {
      if(existsId) {
        res.status(400)
        throw new Error('Compra já cadastrada')
      }
    }
    if(!id) {
      res.status(400)
      throw new Error('id deve ser informada')
    }
    if(!buyer) {
      res.status(400)
      throw new Error('buyer deve ser informada')
    }
    if(!existsBuyer) {
      res.status(400)
      throw new Error('comprador não cadastrado')
    }
    if(!totalPrice) {
      res.status(400)
      throw new Error('totalprice deve ser informada')
    }
    if(typeof totalPrice !== 'number') {
      res.status(400)
      throw new Error('totalprice deve ser numérico')
    }
    if(!createdAt) {
      res.status(400)
      throw new Error('createdAt deve ser informada')
    }
    if(!paid) {
      res.status(400)
      throw new Error('paid deve ser informada')
    }

    await db.raw(`
      INSERT INTO pucharses
      VALUES
        ("${id}","${buyer}",${totalPrice},"${createdAt}",${paid})
    `)
    
    res
      .status(201)
      .send(`Compra cadastrada com sucesso`)

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

app.delete('/users/:id/pucharses/', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id

    const [isUserIdCreated] = await db.raw(`
      SELECT * FROM users
      WHERE id ="${userId}"
    `)

    if(!isUserIdCreated) {
      res.status(400)
      throw new Error('id do usuário não encontrada!')
    }

    const [pucharsesById] = await db.raw(`
      SELECT * FROM pucharses
      where buyer_id = "${userId}"
    `)

    if(!pucharsesById) {
      res.status(400)
      throw new Error('não foram encontradas compras para a id informada')
    }

    await db.raw(`
      DELETE FROM pucharses_products
      WHERE purchase_id = "${pucharsesById.id}"
    `)

    await db.raw(`
      DELETE FROM pucharses
      WHERE buyer_id = "${userId}"
    `)

    res
      .status(200)
      .send("compras excluídas com sucesso")
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