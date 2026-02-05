import { useState } from "react";
import { toast } from "react-toastify";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState([]);
    
const addToCart = (product) => {
    if (!product?.id) {
        toast.error("Invalid product!");
        return;
    }

    setCartItem((prevCart) => {
        const itemInCart = prevCart.find((item) => item.id === product.id);
        if (itemInCart) {
            toast.success("Product quantity increased!");
            return prevCart.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            toast.success("Product added to cart!");
            return [...prevCart, { ...product, quantity: 1 }];
        }
    });
};

const updateQuantity = (productId, action) => {
    setCartItem((prevCart) =>
        prevCart
            .map((item) => {
                if (item.id === productId) {
                    let newQuantity = item.quantity;
                    if (action === "increase") {
                        newQuantity += 1;
                        toast.success("Quantity increased!");
                    } else if (action === "decrease") {
                        newQuantity -= 1;
                        toast.success("Quantity decreased!");
                    }
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
                }
                return item;
            })
            .filter((item) => item !== null)
    );
};

const deleteItem = (productId) => {
    setCartItem((prevCart) =>
        prevCart.filter((item) => item.id !== productId)
    );
    toast.warn("Product deleted from cart!");
};

return (
    <CartContext.Provider
        value={{ cartItem, setCartItem, addToCart, updateQuantity, deleteItem }}
    >
        {children}
    </CartContext.Provider>
);
};
