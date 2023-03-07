"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.pucharses = exports.products = exports.users = void 0;
const types_1 = require("./types/types");
exports.users = [
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
];
exports.products = [
    {
        id: '1',
        name: 'Teclado controlador Alesis',
        price: 2500,
        category: types_1.Categories.KEYBOARD
    },
    {
        id: '2',
        name: 'Guitarra Ibanez RG370FMZ',
        price: 3700,
        category: types_1.Categories.ELETRIC_GUITAR
    },
    {
        id: '3',
        name: 'Valeton GP-200',
        price: 1750,
        category: types_1.Categories.EFFECTS_PROCESSOR
    },
    {
        id: '4',
        name: 'Takamine Premium',
        price: 2250,
        category: types_1.Categories.ACOUSTIC_GUITAR
    }
];
exports.pucharses = [
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
];
function createUser(id, email, password) {
    exports.users.push({
        id: id,
        email: email,
        password: password
    });
    console.log('Cadastro realizado com sucesso');
}
exports.createUser = createUser;
function getAllUsers() {
    console.log(exports.users);
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, category) {
    exports.products.push({
        id: id,
        name: name,
        price: price,
        category: category
    });
    console.log('Produto criado com sucesso');
}
exports.createProduct = createProduct;
function getAllProducts() {
    console.log(exports.products);
}
exports.getAllProducts = getAllProducts;
function getProductById(idToSearch) {
    return exports.products.filter((product) => product.id === idToSearch);
}
exports.getProductById = getProductById;
function queryProductsByName(query) {
    return exports.products.filter(product => product.name.includes(query));
}
exports.queryProductsByName = queryProductsByName;
function createPurchase(userId, productId, quantity, totalPrice) {
    exports.pucharses.push({
        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice
    });
    console.log('Compra realizada com sucesso');
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromUserId(userId) {
    return exports.pucharses.filter(pucharse => pucharse.userId === userId);
}
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map