const OrderedItem = ({ item, updateOrderedItem }) => {
    return (
        <div className="OrderedItem">
            <div className="ItemQuantitySelecter">
                <button className="QualityBtn" onClick={() => updateOrderedItem(item.id, item.count-1)}>-</button> 
                {item.count}
                 <button className="QualityBtn" onClick={() => updateOrderedItem(item.id, item.count+1)}>+</button>
            </div>
            <div className="ItemName">{item.name}</div>
            <div className="ItemPrice">${(item.price * item.count).toFixed(2)}</div>
        </div>
    )
}

export default OrderedItem