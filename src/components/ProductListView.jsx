import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const ProductListView = ({ product }) => {
    const navigate = useNavigate()
    const { addToCart } = useCart()

    return (
        <div className="space-y-4 mt-4">
            <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 
                            flex flex-col md:flex-row gap-6 items-center 
                            p-4 rounded-2xl shadow-lg sm:hover:shadow-2xl 
                            transition duration-300 ease-in-out">

                {/* Product Image */}
                <img
                    src={product.image}
                    alt={product.title}
                    className="md:h-56 md:w-56 h-32 w-32 rounded-xl cursor-pointer object-contain 
                               sm:hover:scale-105 transition-transform duration-300"
                    onClick={() => navigate(`/products/${product.id}`)}
                />

                {/* Product Details */}
                <div className="space-y-3 text-center md:text-left">
                    <h1 className="font-bold md:text-2xl text-lg line-clamp-2 
                                   hover:text-purple-600 transition-colors duration-300">
                        {product.title}
                    </h1>

                    <p className="font-semibold flex items-center justify-center md:justify-start gap-2 md:text-lg text-sm">
                        <span className="text-gray-800">${product.price}</span>
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                            {product.discount}% OFF
                        </span>
                    </p>

                    <p className="text-sm text-gray-600">
                        FREE delivery <span className="font-semibold">Fri, 18 Apr</span> <br />
                        Or fastest delivery <span className="font-semibold">Tomorrow, 17 Apr</span>
                    </p>

                    {/* Add to Cart Button */}
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-gradient-to-r from-pink-400 to-purple-400 
                                   text-white px-5 py-2 rounded-full font-medium 
                                   hover:from-purple-400 hover:to-pink-400 
                                   transition duration-300 shadow-md">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductListView
