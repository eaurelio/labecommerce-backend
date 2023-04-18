// Configuração do projeto
import  express, { Request, Response} from 'express'
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
// Dados da aplicação
// import { users, products, pucharses } from './database';
// import { user, product, purchase, Categories } from './types/types'; 
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
    const result = await db("users")
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

    const [isIdCreated] = await db("users").where("id", "=", `${id}`)

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

    const [isEmailCreated] = await db("users").where("email", "=", `${email}`)

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

    const newUser = {
      id, name, email, password, createdAt
    }

    await db("users").insert(newUser)

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

    const [isIdCreated] = await db("users").where("id", "=", `${id}`)
    console.log("----------------------",isIdCreated, id)

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

    const updateUser = {
      name: name || isIdCreated.name,
      email: email || isIdCreated.email,
      password: password || isIdCreated.password

    }
    await db("users").update(updateUser).where({id: id})
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

    const [isIdCreated] = await db("users").where("id", "=", `${userId}`)

    if(!isIdCreated) {
      res
        .status(400)
        throw new Error('Usuário (id) não localizado!')
    }

    await db("users").delete().where("id", "=", `${userId}`)

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
// Get Products
app.get('/products/', async (req: Request, res: Response) => {
  try {
    const query = req.query.q;

    if(query) {
      if (query?.length === 0) {
        res
          .status(400)
          throw new Error('Informe pelo menos um caractere para a busca!')
      }
      const [result] = await db('products').where("name","like",`%${query}%`)
  
      if(!result) {
        res
          .status(400)
          throw new Error('Produto não localizado!')
      }
      res
      .status(200)
      .send(result)
      return
    }

    const result = await db('products')
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

// Get Products by id
app.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const [isIdCreated] = await db('products').where({id: id})

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

// Create product
app.post('/products', async (req: Request, res: Response) => {
  try{
    const {id, name, price, description, imageUrl} = req.body

    const [existId] = await db("products").where("id","=",`${id}`)
    
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

    const newProduct = {
      id, name, price, description, imageUrl
    }

    await db("products").insert(newProduct)

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

// Edit product by id
app.put('/products/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const {name, price, description, imageUrl} = req.body

    const [isIdCreated] = await db('products').where({id: id})

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

    const editProduct = {
      name: name || isIdCreated.name,
      price: price || isIdCreated.price,
      description: description || isIdCreated.description,
      imageUrl: imageUrl || isIdCreated.imageUrl
    }

    await db('products').update(editProduct).where({id: id})

    res
      .status(200)
      .send('Produto atualizado com sucesso')

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

    const [isIdCreated] = await db("products").where({id: productId})

    if(!isIdCreated) {
      res.status(400)
      throw new Error('produto não encontrado')
    }

    await db("products").delete().where({id: productId})

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

//----------------------------------Purchases----------------------------------
// Get all purchases
app.get('/purchases', async (req: Request, res: Response) => {
  try {
    const result = await db("purchases")
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

// Get Purchase by id
app.get('/purchases/:id', async (req: Request, res: Response) => {
  try {
    const purchaseId = req.params.id

    if(!purchaseId) {
      res.status(200)
      throw new Error('informe a id da purchase!')
    }

    const [isValidPurchase] = await db("purchases").where({id: purchaseId})
    if(!isValidPurchase) {
      res.status(200)
      throw new Error('purchase não encontrada!')
    }

    const purchase = await db('purchases').select(
      "purchases.id as purchaseId",
      "purchases.total_price as totalPrice",
      "purchases.created_at as createdAt",
      "purchases.paid as isPaid",
      "purchases.buyer as buyerId",
      "users.email as email",
      "users.name as name"
    ).innerJoin(
      "users",
      "purchases.buyer",
      "=",
      "users.id"
    ).where("purchases.id", "=", `${purchaseId}`)

    const productsList = await db('products').select(
      "products.id as id",
      "products.name as name",
      "products.price as price",
      "products.description as description",
      "products.imageUrl as imageUrl",
      "purchases_products.quantity as quantity"
    ).innerJoin(
      "purchases_products",
      "products.id",
      "=",
      "purchases_products.product_id"
    ).where("purchases_products.purchase_id","=",`${purchaseId}`)
    
    purchase[0].isPaid = 0 ? 'false' : 'true'
    purchase[0].productsList = productsList;

    res
      .status(200)
      .send(purchase)


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

// Get user purchases by User id
app.get('/users/:id/purchases/', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id

    const [isIdCreated] = await db('users').where({id: userId})

    if(!isIdCreated) {
      res.status(400)
      throw new Error('id do usuário não encontrada')
    }

    const [purchases] = await db('purchases').where({buyer_id: userId})

    if(!purchases) {
      res.status(400)
      throw new Error('não foram encontradas compras para o usuário informado')
    }

    res
      .status(200)
      .send(purchases)

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

// Create purchase
app.post('/purchases', async (req: Request, res: Response) => {
  try{
    const {id, buyer, total_price, created_At, paid, products} = req.body

    const [existsId] = await db('purchases').where({id: id})
    const [existsBuyer] = await db('users').where({id: buyer})

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
    if(!total_price) {
      res.status(400)
      throw new Error('totalprice deve ser informada')
    }
    if(typeof total_price !== 'number') {
      res.status(400)
      throw new Error('totalprice deve ser numérico')
    }
    if(!created_At) {
      res.status(400)
      throw new Error('createdAt deve ser informada')
    }
    if(!paid) {
      res.status(400)
      throw new Error('paid deve ser informada')
    }

    const newPurchase = {
      id, buyer, total_price, created_At, paid
    }

    await db("purchases").insert(newPurchase)

    products.map(async (product:any) => {
      const newItem = {
        purchase_id: newPurchase.id,
        product_id: product.id,
        quantity: product.quantity
      }
      console.table(newItem)
      await db('purchases_products').insert(newItem)
    })
    
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

// Delete Purchase
app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idTodelete = req.params.id;

    const [isValidPurchase] = await db('purchases').where({id: idTodelete})

    if(!isValidPurchase) {
      res.status(400)
      throw new Error ('id da purchase não encontrada!')
    }

    await db('purchases_products').delete().where({purchase_id: idTodelete})
    await db('purchases').delete().where({id: idTodelete})

    res
      .status(200)
      .send('purchase excluída!')


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

// Delete all purchase by user id
app.delete('/users/:id/purchases/', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id

    const [isUserIdCreated] = await db("users").where({id: userId})

    if(!isUserIdCreated) {
      res.status(400)
      throw new Error('id do usuário não encontrada!')
    }

    const [purchasesById] = await db("purchases").where({buyer_id: userId})

    if(!purchasesById) {
      res.status(400)
      throw new Error('não foram encontradas compras para a id informada')
    }

    await db("purchases_products").delete().where({purchase_id: purchasesById.id})
    await db('purchases').delete().where({buyer_id: userId})

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
