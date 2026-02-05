import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    return (
        <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm 
            hover:shadow-xl sm:hover:scale-105 transition-all duration-300 p-3 flex flex-col justify-between gap-6">

            <div>
                {/* 🔴 Discount Badge */}
                {product.discount && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
                        -{product.discount}%
                    </span>
                )}

                {/* Product Image */}
                <div
                    className="bg-gradient-to-br rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/products/${product.id}`)}>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-56 object-contain p-2"/>
                </div>
                
                {/* Title */}
                <h1 className="mt-3 line-clamp-2 text-gray-800 font-semibold text-sm md:text-base">
                    {product.title}
                </h1>
            </div>
            
            {/* Price */}
            <div className='flex justify-between'>
                <p className="my-2 text-lg md:text-xl font-bold text-gray-900">
                    ${product.price}
                </p>

                {/* Add to Cart */}
                <button
                    onClick={() => addToCart(product)}
                    className="mt-auto p-2 rounded-4xl
                    bg-pink-100 text-pink-600
                    hover:text-white hover:bg-pink-300 
                    hover:shadow-lg transition duration-300"
                >
                    <IoCartOutline className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
