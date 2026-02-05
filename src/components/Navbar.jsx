import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import logo from "../assets/logo.png";

const Navbar = ({ location, getLocation, openDropdown, setOpenDropdown }) => {
    const { cartItem } = useCart();
    const [openNav, setOpenNav] = useState(false);

    const toggleDropdown = () => {
        setOpenDropdown((prev) => !prev);
    };

    return (
        <div className="relative z-10 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 py-3 shadow-xl px-4 md:px-0">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex gap-7 items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="logo" className="w-8 md:w-12" />
                        <h1 className="font-bold text-2xl sm:text-3xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                            Game<span className="font-serif">Spark</span>
                        </h1>
                    </Link>

                    {/* Location Display */}
                    <div
                        className="md:flex gap-1 cursor-pointer text-gray-700 items-center hidden hover:text-pink-500 transition"
                        onClick={toggleDropdown}
                    >
                        <MapPin className="text-pink-400" />
                        <span className="font-medium">
                            {location ? (
                                <div className="-space-y-2">
                                    {location?.city || location?.state || ""}
                                    <br />
                                    {location?.postcode || ""}, {location?.country || "Unknown"}
                                </div>
                            ) : (
                                "Add Address"
                            )}
                        </span>
                        <FaCaretDown />
                    </div>

                    {/* Location Dropdown */}
                    {openDropdown && (
                        <div className="absolute top-20 left-80 w-[280px] bg-white border border-gray-100 shadow-xl rounded-xl p-5 z-50 animate-fadeIn">
                        
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="font-semibold text-lg text-gray-800">
                                    Change Location
                                </h1>
                                <button
                                    onClick={toggleDropdown}
                                    className="text-gray-500 hover:text-pink-500 transition"
                                >
                                    <CgClose size={22} />
                                </button>
                            </div>

                            {/* Location Info */}
                            {location ? (
                                <div className="mb-3 text-sm text-gray-700 bg-pink-50 p-2 rounded-md">
                                    <p>{location.city || location.state || "Unknown"}</p>
                                    <p>
                                        {location.postcode || ""} {location.country || "Unknown"}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm mb-3">
                                    No location detected yet...
                                </p>
                            )}

                            {/* Detect Button */}
                            <button
                                onClick={getLocation}
                                className="w-full bg-gradient-to-r from-pink-300 via-purple-300 to-sky-300 text-gray-800 px-4 py-2 rounded-lg font-medium hover:scale-105 transition shadow-md"
                            >
                                Detect My Location
                            </button>
                        </div>
                    )}
                </div>

                {/* Menu Section */}
                <nav className="flex gap-7 items-center">
                    {/* Desktop Menu */}
                    <ul className="md:flex gap-7 items-center text-lg font-medium hidden">
                        {[
                            { name: "Home", path: "/" },
                            { name: "Products", path: "/products" },
                            { name: "About", path: "/about" },
                            { name: "Contact", path: "/contact" },
                        ].map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `${isActive
                                        ? "border-b-2 border-pink-400 text-pink-500"
                                        : "text-gray-700 hover:text-pink-400"
                                    } cursor-pointer transition-all`
                                }
                            >
                                <li>{item.name}</li>
                            </NavLink>
                        ))}
                    </ul>

                    {/* Cart Icon */}
                    <Link to="/cart" className="relative">
                        <IoCartOutline className="h-7 w-7 text-gray-700 hover:text-pink-500 transition" />
                        <span className="bg-pink-400 px-2 py-1 rounded-full absolute -top-3 -right-3 text-white text-xs shadow-md">
                            {cartItem?.length || 0}
                        </span>
                    </Link>

                    {/* Auth Buttons */}
                    <div className="hidden md:block">
                        <SignedOut>
                            <SignInButton className="bg-gradient-to-r from-pink-300 to-purple-300 text-gray-800 px-4 py-1 rounded-md font-medium shadow hover:scale-105 transition" />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>

                    {/* Mobile Menu Icon */}
                    {openNav ? (
                        <HiMenuAlt3
                            onClick={() => setOpenNav(false)}
                            className="h-7 w-7 md:hidden cursor-pointer text-gray-700"
                        />
                    ) : (
                        <HiMenuAlt1
                            onClick={() => setOpenNav(true)}
                            className="h-7 w-7 md:hidden cursor-pointer text-gray-700"
                        />
                    )}
                </nav>
            </div>

            {/* Responsive Menu */}
            <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
        </div>
    );
};

export default Navbar;
