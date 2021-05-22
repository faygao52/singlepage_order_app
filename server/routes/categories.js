/**
 * Categories module used to implement CRUD on categories
 * as we don't have database at this stage, data will be retrieved
 * from JSON file under utils
 */

const express = require('express')
const fs = require('fs')
const router = express.Router()

/**
 * Retreive categories
 * @returns {Object[]} array of categroies
 */
const listCategory = () => {
    const categories = require('../utils/categories.json')
    return categories
}

/**
 * Retreive items by given id,
 * @param {number} id - identifier of a category 
 * @returns {Object[]} array of items under certain category
 */
const listItemsByCategoryId = (id) => {
    if (!id) return []
    const categories = require('../utils/categories.json')
    const items = require('../utils/items.json')
    return items.filter(i => i.categoryId === id)
}

/**
 * Retrieve a list of categories
 */
router.get('/', (req, res) => {
    res.json(listCategory())
})

/**
 * Retreive a list of items under certain module
 * @param {Object} req - request that includes
 * @param {Object} res - response
 */
router.get('/:id/items', (req, res) => {
    const products = listItemsByCategoryId(Number(req.params.id))
    res.json(products)
})

module.exports = router
