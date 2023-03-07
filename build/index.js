"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const types_1 = require("./types/types");
const application = process.argv[2];
console.log(`A aplicação '${application}' foi iniciada...`);
console.table(database_1.users);
console.table(database_1.products);
console.table(database_1.pucharses);
(0, database_1.createUser)('256', 'Melina', '98653241785');
(0, database_1.getAllUsers)();
(0, database_1.createProduct)('4', 'Corda para guitarra NIG 009', 45, types_1.Categories.ACCESSORIES);
(0, database_1.getAllProducts)();
console.table((0, database_1.getProductById)('3'));
console.log((0, database_1.queryProductsByName)('Gui'));
(0, database_1.createPurchase)('1', '4', 1, 2250);
console.log((0, database_1.getAllPurchasesFromUserId)('1'));
//# sourceMappingURL=index.js.map