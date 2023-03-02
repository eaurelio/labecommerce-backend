import { users, products, pucharses } from "./database"

const application = process.argv[2]
console.log(`A aplicação '${application}' foi iniciada...`)

console.table(users)
console.table(products)
console.table(pucharses)