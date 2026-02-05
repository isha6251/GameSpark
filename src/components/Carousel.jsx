import { useEffect } from 'react'
import { useData } from '../context/UseData'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Category from './Category';
import { useNavigate } from 'react-router-dom';

const Carousel = () => {
    const { data, fetchAllProducts } = useData()
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllProducts()
    }, [fetchAllProducts])

    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`} style={{ zIndex: 3 }}>
                <AiOutlineArrowLeft
                    className='arrows'
                    style={{
                        ...style,
                        display: "block",
                        borderRadius: "50px",
                        background: "#f9a8d4",
                        color: "white",
                        position: "absolute",
                        padding: "6px",
                        left: "40px",
                        top: "50%",
                        transform: "translateY(-50%)"
                    }}
                />
            </div>
        )
    }

    const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`}>
                <AiOutlineArrowRight
                    className='arrows'
                    style={{
                        ...style,
                        display: "block",
                        borderRadius: "50px",
                        background: "#93c5fd",
                        color: "white",
                        position: "absolute",
                        padding: "6px",
                        right: "40px",
                        top: "50%",
                        transform: "translateY(-50%)"
                    }}
                />
            </div>
        )
    }

    let settings = {
        dots: false,
        autoplay: true,
        autoplaySpeed: 3500,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024, // tablet
                settings: {
                    arrows: true,
                    dots: true,
                }
            },
            {
                breakpoint: 768, // mobile
                settings: {
                    arrows: false,
                    dots: true,
                }
            }
        ]
    };

    const pastelBackgrounds = [
        "bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100",
        "bg-gradient-to-r from-yellow-100 via-pink-100 to-red-100",
        "bg-gradient-to-r from-teal-100 via-green-100 to-lime-100",
        "bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100",
        "bg-gradient-to-r from-sky-100 via-blue-100 to-indigo-100"
    ];

    return (
        <div className='w-full overflow-hidden'>
            <Slider {...settings}>
                {
                    data?.slice(0, 7)?.map((item, index) => {
                        const bgClass = pastelBackgrounds[index % pastelBackgrounds.length];
                        return (
                            <div key={index} className={`${bgClass} -z-10`}>
                                <div className='flex flex-col md:flex-row gap-6 md:gap-10 justify-center h-[600px] sm:h-[650px] items-center p-4 sm:px-6 lg:px-12'>

                                    {/* Text Section */}
                                    <div className='md:space-y-6 space-y-3 text-center md:text-left'>
                                        <h3 className='text-pink-500 font-semibold font-sans text-xs sm:text-sm tracking-wide'>
                                            Powering Your World with the Best Products
                                        </h3>
                                        <h1 className='text-xl sm:text-2xl md:text-4xl font-bold uppercase line-clamp-2 md:line-clamp-3 md:w-[500px] text-gray-800'>
                                            {item.title}
                                        </h1>
                                        <p className='text-sm sm:text-base md:w-[500px] line-clamp-3 text-gray-600 pr-2'>
                                            {item.description}
                                        </p>
                                        <button onClick={() => navigate('/products')} className='bg-gradient-to-r from-pink-300 to-purple-300 text-gray-800 px-4 sm:px-5 py-2 sm:py-3 rounded-full cursor-pointer mt-3 sm:hover:scale-105 transition-all shadow-md text-sm sm:text-base'>
                                            Shop Now
                                        </button>
                                    </div>

                                    {/* Image Section */}
                                    <div>
                                        <img onClick={() => navigate(`/products`)}
                                            src={item.image}
                                            alt={item.title}
                                            // className='rounded-2xl w-[180px] sm:w-[220px] md:w-[380px] sm:hover:scale-105 transition-all shadow-2xl shadow-blue-200'
                                            className='rounded-4xl p-4 w-[200px] sm:w-[220px] md:w-[300px] sm:hover:scale-105 transition-all'
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </Slider>
            <Category />
        </div>
    )
}

export default Carousel
