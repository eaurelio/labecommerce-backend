
# Labecommerce

API desenvolvida em NodeJS para o backend de um ecommmerce, que recebe requisições, manipula informações em um banco de dados SQL e retonra dados sobre o processamento da requisição.

## Tecnologias utilizadas

- Typescript
- NodeJS
- Knex
- SQLite

## Documentação da API

* ### Consulte a documentação completa no [Postman](https://documenter.getpostman.com/view/24823115/2s93XzyiXP)

## Get all users
Retorna todas as pessoas cadastradas.<br> Dica: atenção com o nome da propriedade createdAt! Ela deve vir em camelCase, apesar de estar em snake_case no banco de dados.
```typescript
// Request
// GET /users

// Response
// status 200 OK
[
    {
        id: "1",
        name: "Fulano",
        email: "fulano@email.com",
        password: "fulano123",
        createdAt: "2023-01-15 09:12:42"
    },
    {
        id: "2",
        name: "Ciclana",
        email: "ciclana@email.com",
        password: "ciclana99",
        createdAt: "2023-01-17 12:35:28"
    }
]
```

## Create user
Cadastra uma nova pessoa.
```typescript
// Request
// POST /users
// body JSON
{
    "id": "3",
    "name": "Astrodev",
    "email": "astrodev@email.com",
    "password": "astrodev00"
}

// Response
// status 201 CREATED
{
    message: "Cadastro realizado com sucesso"
}
```

## Create product
Cadastra um novo produto.
```typescript
// Request
// POST /products
// body JSON
{
    "id": "3",
    "name": "Teclado gamer",
    "price": 200,
    "description": "Teclado mecânico com numpad",
    "imageUrl": "https://picsum.photos/seed/Teclado%20gamer/400"
}

// Response
// status 201 CREATED
{
    message: "Produto cadastrado com sucesso"
}
```

## Get all products funcionalidade 1
Retorna todos os produtos cadastrados.
```typescript
// Request
// GET /products

// Response
// status 200 OK
[
    {
        id: "1",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        id: "2",
        name: "Monitor",
        price: 900,
        description: "Monitor LED Full HD 24 polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400"
    },
    {
        id: "3",
        name: "Teclado gamer",
        price: 200,
        description: "Teclado mecânico com numpad",
        imageUrl: "https://picsum.photos/seed/Teclado%20gamer/400"
    }
]
```

## Get all products funcionalidade 2
Caso seja enviada uma query params (q) deve ser retornado o resultado da busca de produtos por nome.
```typescript
// Request
// query params = q
// GET /products?q=gamer

// Response
// status 200 OK
[
    {
        id: "1",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        id: "3",
        name: "Teclado gamer",
        price: 200,
        description: "Teclado mecânico com numpad",
        imageUrl: "https://picsum.photos/seed/Teclado%20gamer/400"
    }
]
```

## Edit product by id
Edita um produto existente.
```typescript
// Request
// path params = :id

// PUT /products/prod003
// body JSON
{
    "id": "33",
    "name": "Teclado gamer RGB",
    "price": 300,
    "description": "Teclado mecânico com RGB e numpad",
    "imageUrl": "https://picsum.photos/seed/Teclado%20gamer%20RGB/400"
}

// Response
// status 200 OK
{
    message: "Produto atualizado com sucesso"
}
```

## Create purchase
Cadastra um novo pedido. Como dica, o exercício 1 da aula de [Relações em SQL II](https://github.com/labenuexercicios/relacoes-sql-II-exercicios) é uma boa referência.
```typescript
// Request
// POST /purchases
// body JSON
{
    "id": "1",
    "buyer": "u001",
    "totalPrice": 1400,
    "products": [
        {
            "id": "1",
            "name": "Mouse gamer",
            "price": 250,
            "description": "Melhor mouse do mercado!",
            "imageUrl": "https://picsum.photos/seed/Mouse%20gamer/400",
            "quantity": 2
        },
        {
            "id": "2",
            "name": "Monitor",
            "price": 900,
            "description": "Monitor LED Full HD 24 polegadas",
            "imageUrl": "https://picsum.photos/seed/Monitor/400",
            "quantity": 1
        }
    ]
}

// Response
// status 201 CREATED
{
    message: "Pedido realizado com sucesso"
}
```

## Delete purchase by id
Deleta um pedido existente.
```typescript
// Request
// path params = :id
// DELETE /purchases/pur002

// Response
// status 200 OK
{
    message: "Pedido cancelado com sucesso"
}
```

## Get purchase by id
Retorna os dados de uma compra, incluindo a lista de produtos da mesma.
```typescript
// Request
// path params = :id
// GET /purchases/pur001

// Response
// status 200 OK
{
    purchaseId: "1",
    buyerId: "1",
    buyerName: "Fulano",
    buyerEmail: "fulano@email.com",
    totalPrice: 1400,
    createdAt: "2023-01-15 16:24:54",
    paid: 0,
    products: [
        {
            id: "1",
            name: "Mouse gamer",
            price: 250,
            description: "Melhor mouse do mercado!",
            imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
            quantity: 2
        },
        {
            id: "2",
            name: "Monitor",
            price: 900,
            description: "Monitor LED Full HD 24 polegadas",
            imageUrl: "https://picsum.photos/seed/Monitor/400",
            quantity: 1
        }
    ]
}
```

## Referências

 - [SQLite tutorial](https://www.sqlitetutorial.netn/)
 - [Dev Mozilla](https://developer.mozilla.org/pt-BR/)
 - [w3schools](https://www.w3schools.com/)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)

## Autor

- [Edson Aurélio](https://www.github.com/eaurelio)