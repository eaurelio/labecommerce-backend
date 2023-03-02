"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const application = process.argv[2];
console.log(`A aplicação '${application}' foi iniciada...`);
console.table(database_1.users);
console.table(database_1.products);
console.table(database_1.pucharses);
//# sourceMappingURL=index.js.map