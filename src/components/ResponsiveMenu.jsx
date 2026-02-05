import { useEffect, useRef } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
    const { user } = useUser();
    const menuRef = useRef(null);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    // Body click listener
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenNav(false);
            }
        };

        if (openNav) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openNav, setOpenNav]);

    return (
        <div
            ref={menuRef}
            className={`${openNav ? "left-0" : "-left-full"}
                fixed bottom-0 top-0 z-30 flex h-screen w-[75%] flex-col 
                justify-between bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 
                px-8 pb-6 pt-16 text-gray-800 md:hidden rounded-r-2xl 
                shadow-2xl transition-all duration-500 ease-in-out`}
        >
            <div>
                {/* User Info Section */}
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-md">
                    {user ? (
                        <UserButton size={48} />
                    ) : (
                        <FaUserCircle size={48} className="text-blue-300" />
                    )}
                    <div>
                        <h1 className="font-bold text-lg text-gray-800">
                            Hello, {user?.firstName || "Guest"}
                        </h1>
                        <h1 className="text-sm text-slate-500">
                            {user ? "Premium User" : "Welcome to GameSpark"}
                        </h1>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="mt-12">
                    <ul className="flex flex-col gap-6 text-xl font-semibold">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setOpenNav(false)}
                                className="cursor-pointer px-4 py-2 rounded-xl
                                           hover:bg-gradient-to-r hover:from-pink-300 hover:to-blue-300 
                                           hover:text-white transition-all duration-300"
                            >
                                <li>{link.name}</li>
                            </Link>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Auth Buttons + Footer */}
            <div className="flex flex-col items-center gap-4">
                <SignedOut>
                    <SignInButton className="w-full bg-gradient-to-r from-pink-300 to-purple-300 text-gray-800 px-4 py-2 rounded-lg font-medium shadow hover:scale-105 transition" />
                </SignedOut>
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>

                <p className="text-center text-sm text-gray-600 mt-4">
                    © {new Date().getFullYear()}{" "}
                    <span className="font-bold text-purple-500">GameSpark</span>
                </p>
            </div>
        </div>
    );
};

export default ResponsiveMenu;
