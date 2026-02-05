import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 text-gray-700 py-12">
            <div className="max-w-7xl mx-auto px-6 md:flex md:justify-between md:space-x-8">
                {/* info */}
                <div className="mb-8 md:mb-0">
                    <Link to="/" className="flex items-center space-x-2">
                        <img src={logo} alt="logo" className="w-8 sm:w-10" />
                        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                            GameSpark
                        </h1>
                    </Link>
                    <p className="mt-3 text-sm">Powering Your World with the Best in Electronics.</p>
                    <p className="mt-1 text-sm">123 Electronics St, Style City, NY 10001</p>
                    <p className="text-sm">Email: support@GameSpark.com</p>
                    <p className="text-sm">Phone: (123) 456-7890</p>
                </div>

                {/* customer service links */}
                <div className="mb-8 md:mb-0">
                    <h3 className="text-lg font-semibold text-gray-800">Customer Service</h3>
                    <ul className="mt-3 text-sm space-y-2">
                        <li className="hover:text-pink-500 cursor-pointer">Contact Us</li>
                        <li className="hover:text-pink-500 cursor-pointer">Shipping & Returns</li>
                        <li className="hover:text-pink-500 cursor-pointer">FAQs</li>
                        <li className="hover:text-pink-500 cursor-pointer">Order Tracking</li>
                        <li className="hover:text-pink-500 cursor-pointer">Size Guide</li>
                    </ul>
                </div>

                {/* social media */}
                <div className="mb-8 md:mb-0">
                    <h3 className="text-lg font-semibold text-gray-800">Follow Us</h3>
                    <div className="flex space-x-4 mt-3 text-2xl">
                        <FaFacebook className="text-blue-500 hover:scale-110 transition cursor-pointer" />
                        <FaInstagram className="text-pink-400 hover:scale-110 transition cursor-pointer" />
                        <FaTwitterSquare className="text-sky-400 hover:scale-110 transition cursor-pointer" />
                        <FaPinterest className="text-red-400 hover:scale-110 transition cursor-pointer" />
                    </div>
                </div>

                {/* newsletter */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Stay in the Loop</h3>
                    <p className="mt-3 text-sm">Subscribe to get special offers, free giveaways, and more</p>
                    <form action="" className="mt-4 flex">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full p-2 rounded-l-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-md"
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-pink-300
                             via-purple-300 to-sky-300
                              text-gray-800 px-4 rounded-r-full font-medium 
                              hover:bg-gradient-to-r hover:from-blue-300
                             hover:via-purple-300 hover:to-pink-300 transition duration-300">Subscribe</button>
                    </form>
                </div>
            </div>

            {/* bottom */}
            <div className="mt-10 border-t border-gray-300 pt-6 text-center text-sm text-gray-600">
                <p>
                    &copy; {new Date().getFullYear()}{" "}
                    <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                        GameSpark
                    </span>. All rights reserved
                </p>
            </div>
        </footer>
    )
}

export default Footer
