const Item = ({ item, addToOrder }) => {
    return (
        <div className="ProductCard" onClick={() => addToOrder(item)}>
            <img src={item.img}/>
            <div className="ProductName">{item.name} ${item.price}</div>
        </div>
    )
}

export default Item