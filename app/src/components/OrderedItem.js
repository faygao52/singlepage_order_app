const OrderedItem = ({ item, updateOrderedItem }) => {
    return (
        <div className="OrderedItem">
            <div className="ItemQuantitySelecter">
                <button className="QualityBtn" onClick={() => updateOrderedItem(item.id, item.quantity-1)}>-</button> 
                {item.quantity}
                 <button className="QualityBtn" onClick={() => updateOrderedItem(item.id, item.quantity+1)}>+</button>
            </div>
            <div className="ItemName">{item.name}</div>
            <div className="ItemPrice">${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    )
}

export default OrderedItem