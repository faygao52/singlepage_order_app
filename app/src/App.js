import './styles/App.css'
import React, { useState, useEffect } from 'react'
import Products from './components/Products'
import Orders from './components/Orders'

const App = (props) => {
    // Initialize the states 
    const [ orders, setOrders ] = useState([])
    const [ categories, setCategories ] = useState([])
    const [ hasError, setHasError ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    /**
     * Handles user's click product cards, 
     * it will add item or update the ordered number of item 
     * 
     * @param {Object} item - the item that user clicked
     */
    const addToOrder = (item) => {
        let ordered = orders.find(order => order.id === item.id)
        if (ordered) {
            ordered.quantity++
        } else {
            ordered = {
                quantity: 1,
                ...item
            }
            orders.push(ordered)
        }
        setOrders([...orders])
    }

    /**
     * Hanlde number of item changed
     * 
     * @param {number} itemId - identifier of item
     * @param {number} quantity - updated quantity
     */
    const updateOrderedItem = (itemId, quantity) => {
        // remove item from order
        if (!quantity) {
            setOrders(orders.filter(item => item.id !== itemId))
        } else {
            let ordered = orders.find(order => order.id === itemId)
            ordered.quantity = quantity
            setOrders([...orders])
        }
    }

    /**
     * Retrieve categories from API
     */
    const retrieveCategories = async () => {
        setLoading(true)
        fetch('/categories')
            .then(res => {
                if (res.ok) return res.json()
                setLoading(false)
                setHasError('Something went wrong, please try again later')
            })
            .then(res => {
                setLoading(false)
                setCategories(res)
            })
            .catch(setHasError)
    }

    /**
     * Reset orders
     */
    const cleanOrders = () => {
        setOrders([])
    }

    useEffect(retrieveCategories, [])

    if (loading) return (<span> Loading... </span>)
    if (hasError) return (<span>Error: {hasError}</span>)
    return (
        <div className="App">
            <Products categories={categories} addToOrder={addToOrder}/>
            <Orders 
                orderedItems={orders} 
                cleanOrders={cleanOrders}
                updateOrderedItem={updateOrderedItem}
            />
        </div>
    )
}
export default App
