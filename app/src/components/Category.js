import Item from './Item'
import React, { useState, useEffect } from 'react'

const Category = ({ category, addToOrder }) => {
    const [ items, setItems ] = useState([])
    const [ hasError, setHasError ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`/categories/${category.id}/items`)
            .then((res) => {
                if (res.ok) return res.json()
                setLoading(false)
                setHasError('Unable to load items, please try again later')
            })
            .then((item) => {
                setLoading(false)
                setItems(item)
            })
            .catch(setHasError)
    }, [])

    return (
        <div className="Category">
            <h2 className="CategoryName">{category.name}</h2>
            <div className="ItemWrapper">
                { loading && (<span> Loading items... </span>) }
                { hasError && (<span>Error: {hasError}</span>) }
                { !loading && !hasError && items.map(item => 
                    <Item 
                        key={item.id}
                        item={item} 
                        addToOrder={addToOrder}
                    />)}
            </div>
        </div>
    )
}

export default Category