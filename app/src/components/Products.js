import '../styles/Products.css'
import Category from './Category'
const Products = ({ categories, addToOrder }) => {
    return (
        <div className="Products">
            <div className="SectionHeader">Products</div>
                {categories.map(category => 
                    <Category 
                        key={category.id}
                        category={category} 
                        addToOrder={addToOrder}
                    />
                )}
        </div>
    )
}
export default Products