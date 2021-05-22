import '../styles/Orders.css'
import { useState, useEffect } from 'react'
import OrderedItem from './OrderedItem'

const Orders = ({ orderedItems, updateOrderedItem }) => {
    const [ totalAmount, setTotalAmount ] = useState(0)
    const [ hasError, setHasError ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    /**
     * Calculate the total amount after order changed
     */
    const calculateTotalAmount = () => {
        let total = 0
        orderedItems.forEach(order => {
            total += order.count * order.price
        })
        setTotalAmount(total.toFixed(2))
    }

    useEffect(calculateTotalAmount, [orderedItems])

    /**
     * Hanldes pay button clicked, a POST request will
     * send to backend API
     */
    const placeOrder = () => {
        setLoading(true)
        const payload = {
            itemIds: orderedItems.map(order => order.id),
            totalAmount
        }
        console.log('payload', payload)
        fetch('/checkout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then((res) => {
            setLoading(false)
        })
        .catch(setHasError)
    }

    return (
        <div className="Order">
            <div className="SectionHeader">Orders</div>
            <div className="OrderedItemsWrapper">
                {orderedItems.map(item => <OrderedItem 
                    key={item.id}
                    item={item} 
                    updateOrderedItem={updateOrderedItem} />)}
            </div>
            <div className="Payment">
                <div>Total</div>
                <div>${totalAmount ? totalAmount : 0}</div>
            </div>
            <button className="PayBtn" onClick={placeOrder}>Pay</button>
        </div>
    )
}

export default Orders