/**
 * A simple API server 
 */
const express = require("express")
const Category = require('./routes/categories')
const Checkout = require('./routes/checkout')

const PORT = process.env.SERVER_PORT || 3001

const app = express()

app.use(express.json())
app.use('/categories', Category)
app.use("/checkout", Checkout)

const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

module.exports = server