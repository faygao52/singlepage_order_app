/**
 * Checkout module to handle payments
 */

const express = require('express')
const fs = require('fs')

const router = express.Router()
const OUTPUT_FILE = process.env.OUTPUT_PATH || './output.json'

/**
 * Get the payment detail from request body and write to output file
 */
router.post('/', (req, res) => {
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(req.body))
    res.sendStatus(200)
})

module.exports = router
