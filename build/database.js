"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pucharses = exports.products = exports.users = void 0;
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
        category: 'Instrumento musical'
    },
    {
        id: '2',
        name: 'Guitarra Ibanez RG370FMZ',
        price: 3700,
        category: 'Instrumento musical'
    },
    {
        id: '3',
        name: 'Valeton GP-200',
        price: 1750,
        category: 'Processador de efeitos'
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
//# sourceMappingURL=database.js.map