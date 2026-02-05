import { useNavigate } from 'react-router-dom'
import banner from '../assets/banner4.jpg'

const MidBanner = () => {
    const navigate = useNavigate()

    return (
        <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 py-10 sm:py-16 md:py-20">
            <div
                className="relative bg-fixed max-w-7xl mx-auto rounded-lg sm:rounded-2xl sm:bg-bottom bg-right-bottom bg-cover h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden"
                style={{
                    backgroundImage: `url(${banner})`,
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 sm:bg-black/5 rounded-lg sm:rounded-2xl flex items-center justify-center px-4 sm:px-8 md:px-12">
                    {/* Content */}
                    <div className="text-center max-w-3xl">
                        <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold sm:font-bold mb-3 sm:mb-4 text-gray-800 drop-shadow-sm leading-snug">
                            Next-Gen Electronics at Your Fingertips
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-extrabold mb-5 sm:mb-6 text-white sm:text-pink-600 max-w-2xl mx-auto">
                            Discover the latest tech innovations with unbeatable prices and free shipping on all orders.
                        </p>
                        <button className="relative inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-full text-gray-800 text-sm sm:text-base font-semibold overflow-hidden group transition-all shadow-md">
                            <span onClick={() => navigate(`/category/electronics`)} className="absolute inset-0 bg-gradient-to-r from-pink-300 via-purple-300 to-sky-300 group-hover:opacity-90 transition-opacity duration-300"></span>
                            <span onClick={() => navigate(`/category/electronics`)} className="relative ">Shop Now</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MidBanner
