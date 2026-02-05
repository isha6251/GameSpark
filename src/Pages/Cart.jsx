import { useCart } from '../context/CartContext';
import { FaRegTrashAlt } from 'react-icons/fa';
import { LuNotebookText } from 'react-icons/lu';
import { MdDeliveryDining } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import emptyCart from "../assets/empty-cart.png";

const Cart = ({ location = {}, getLocation }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  // Local state
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [address, setAddress] = useState(location?.county || '');
  const [state, setState] = useState(location?.state || '');
  const [postcode, setPostcode] = useState(location?.postcode || '');
  const [country, setCountry] = useState(location?.country || '');
  const [phone, setPhone] = useState('');

  // ✅ Total
  const totalPrice = cartItem.reduce(
    (total, item) => total + (item.price * (item.quantity || 1)), 0
  );
  const deliveryCharge = 0;
  const handlingCharge = 5;
  const grandTotal = totalPrice + handlingCharge + deliveryCharge;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 sm:px-6 md:px-8 py-8 sm:py-12">
      {cartItem.length > 0 ? (
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white text-center drop-shadow-md">
            🛒 My Cart <span className="text-red-400">({cartItem.length})</span>
          </h1>

          {/* Items List + Bill */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            {/* Items */}
            <div className="space-y-6">
              {cartItem.map((item) => (
                <div
                  key={item.id}
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row md:items-center justify-between gap-4 md:gap-6 shadow-lg sm:hover:scale-[1.01] transition-all duration-300"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-4 sm:gap-5 flex-1">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-15 rounded-xl object-cover shadow-md cursor-pointer"
                      // className="sm:h-[24px] sm:w-24 rounded-xl object-cover shadow-md cursor-pointer"
                      onClick={() => navigate(`/products/${item.id}`)}
                    />
                    <div className="flex-1">
                      <h1
                        className="text-base sm:text-lg font-semibold text-white line-clamp-2 hover:text-purple-400 transition-colors cursor-pointer"
                        onClick={() => navigate(`/products/${item.id}`)}
                      >
                        {item.title}
                      </h1>
                      <p className="text-red-400 font-bold text-lg sm:text-xl">
                        ${item.price}
                      </p>
                    </div>
                  </div>

                  {/* Quantity + Delete */}
                  <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
                    <div className="flex items-center gap-3 bg-gradient-to-r
                     from-pink-400 via-purple-400 to-sky-400                    
                        px-3 py-1.5 rounded-lg shadow-md">
                      <button
                        onClick={() => updateQuantity(item.id, "decrease")}
                        className="px-1.5 sm:px-2 font-bold text-lg sm:text-xl hover:scale-110 transition"
                      >
                        -
                      </button>
                      <span className="text-base sm:text-lg">{item.quantity || 1}</span>
                      <button
                        onClick={() => updateQuantity(item.id, "increase")}
                        className="px-1.5 sm:px-2 font-bold text-lg sm:text-xl hover:scale-110 transition"
                      >
                        +
                      </button>
                    </div>
                    <span
                      onClick={() => deleteItem(item.id)}
                      className="p-2 sm:p-3 rounded-full hover:bg-red-500/20 transition cursor-pointer">
                      <FaRegTrashAlt className="text-red-400 text-xl sm:text-2xl" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Checkout Section (Bill + Delivery Info Together) */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-5 sm:p-6 shadow-lg space-y-6 lg:sticky lg:top-24 h-fit">

              {/* Bill */}
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white mb-4">💳 Bill Details</h1>
                <div className="flex justify-between text-gray-200 mb-2">
                  <p className="flex items-center gap-2"><LuNotebookText /> Items Total</p>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-200 mb-2">
                  <p className="flex items-center gap-2"><MdDeliveryDining /> Delivery</p>
                  <span className="text-green-400 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-gray-200 mb-2">
                  <p className="flex items-center gap-2"><GiShoppingBag /> Handling</p>
                  <span>${handlingCharge}</span>
                </div>
                <hr className="border-gray-500/30 my-4" />
                <div className="flex justify-between text-lg sm:text-xl text-white font-bold">
                  <p>Grand Total</p>
                  <span>${grandTotal}</span>
                </div>
              </div>
              <button className="w-full py-2 sm:py-3 rounded-xl bg-gradient-to-r
              from-pink-400 via-purple-400 to-sky-400
              text-white font-semibold hover:opacity-90 transition">
                Proceed to Checkout 🚀
              </button>

              <hr className="border-gray-500/30" />

              {/* Delivery Form */}
              <div className="space-y-5">
                <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">📦 Delivery Info</h1>

                {/* Full Name */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2 sm:py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition"
                  />
                  <span className="absolute right-4 top-3.5 text-gray-400"></span>
                </div>

                {/* Address */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 sm:py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition"
                  />
                  <span className="absolute right-4 top-3.5 text-gray-400"></span>
                </div>

                {/* State + Postcode */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-4 py-2 sm:py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition"
                    />
                    <span className="absolute right-4 top-3.5 text-gray-400"></span>
                  </div>
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Postcode"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition"
                    />
                    <span className="absolute right-4 top-3.5 text-gray-400"></span>
                  </div>
                </div>

                {/* Country + Phone */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-2 sm:py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition"
                    />
                    <span className="absolute right-4 top-3.5 text-gray-400"></span>
                  </div>
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Phone No"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 sm:py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition"
                    />
                    <span className="absolute right-4 top-3.5 text-gray-400"></span>
                  </div>
                </div>
                <button className="w-full mt-2 py-2 sm:py-3 rounded-xl bg-gradient-to-r
                from-pink-400 via-purple-400 to-sky-400  
                text-white font-semibold hover:opacity-90 transition">
                  Save Delivery Info
                </button>
                <button
                  onClick={getLocation}
                  className="w-full mt-3 py-2 sm:py-3 rounded-xl border border-purple-400 text-purple-300 hover:bg-purple-500/20 transition"
                >
                  Detect Location 📍
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Empty Cart
        <div className="flex flex-col items-center justify-center h-[500px] sm:h-[600px] gap-6 px-4 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-white drop-shadow-md">
            Your Cart is Empty😢
          </h1>
          <img src={emptyCart} alt="Empty Cart" className="w-48 sm:w-[350px] drop-shadow-2xl" />
          <button
            onClick={() => navigate('/products')}
            className="px-5 sm:px-6 py-2.5 sm:py-3
            bg-gradient-to-r from-pink-400 to-purple-400 text-white
            rounded-xl shadow-lg hover:opacity-90 transition"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

// import { useCart } from '../context/CartContext';
// import { FaRegTrashAlt } from 'react-icons/fa';
// import { LuNotebookText } from 'react-icons/lu';
// import { MdDeliveryDining } from 'react-icons/md';
// import { GiShoppingBag } from 'react-icons/gi';
// import { useUser } from '@clerk/clerk-react';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import emptyCart from "../assets/empty-cart.png";

// const Cart = ({ location = {}, getLocation }) => {
//   const { cartItem, updateQuantity, deleteItem } = useCart();
//   const { user } = useUser();
//   const navigate = useNavigate();

//   // Local state for delivery form
//   const [fullName, setFullName] = useState(user?.fullName || '');
//   const [address, setAddress] = useState(location?.county || '');
//   const [state, setState] = useState(location?.state || '');
//   const [postcode, setPostcode] = useState(location?.postcode || '');
//   const [country, setCountry] = useState(location?.country || '');
//   const [phone, setPhone] = useState('');

//   const totalPrice = cartItem.reduce(
//     (total, item) => total + (item.price * (item.quantity || 1)), 0
//   );

//   return (
//     <div className='mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0'>
//       {cartItem.length > 0 ? (
//         <div>
//           <h1 className='font-bold text-2xl'>My Cart ({cartItem.length})</h1>
//           <div>
//             <div className='mt-10'>
//               {cartItem.map((item) => (
//                 <div
//                   key={item.id}
//                   className='bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full'>
//                   <div className='flex items-center gap-4'>
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className='w-20 h-20 rounded-md' />
//                     <div>
//                       <h1 className='md:w-[300px] line-clamp-2'>{item.title}</h1>
//                       <p className='text-red-500 font-semibold text-lg'>
//                         ${item.price}
//                       </p>
//                     </div>
//                   </div>
//                   <div className='bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl'>
//                     <button
//                       onClick={() => updateQuantity(cartItem, item.id, "decrease")}
//                       className='cursor-pointer'>
//                       -
//                     </button>
//                     <span>{item.quantity}</span>
//                     <button
//                       onClick={() => updateQuantity(cartItem, item.id, "increase")}
//                       className='cursor-pointer'>
//                       +
//                     </button>
//                   </div>
//                   <span
//                     onClick={() => deleteItem(item.id)}
//                     className='hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl'>
//                     <FaRegTrashAlt className='text-red-500 text-2xl cursor-pointer' />
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <div className='grid grid-cols-1 md:grid-cols-2 md:gap-20'>

//               {/* Delivery Info */}
//               <div className='bg-gray-100 rounded-md p-7 mt-4 space-y-2'>
//                 <h1 className='text-gray-800 font-bold text-xl'>Delivery Info</h1>
//                 <div className='flex flex-col space-y-1'>
//                   <label>Full Name</label>
//                   <input
//                     type="text"
//                     placeholder='Enter your name'
//                     className='p-2 rounded-md'
//                     value={fullName}
//                     onChange={(e) => setFullName(e.target.value)} />
//                 </div>
//                 <div className='flex flex-col space-y-1'>
//                   <label>Address</label>
//                   <input
//                     type="text"
//                     placeholder='Enter your address'
//                     className='p-2 rounded-md'
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)} />
//                 </div>
//                 <div className='flex w-full gap-5'>
//                   <div className='flex flex-col space-y-1 w-full'>
//                     <label>State</label>
//                     <input
//                       type="text"
//                       placeholder='Enter your state'
//                       className='p-2 rounded-md w-full'
//                       value={state}
//                       onChange={(e) => setState(e.target.value)} />
//                   </div>
//                   <div className='flex flex-col space-y-1 w-full'>
//                     <label>PostCode</label>
//                     <input
//                       type="text"
//                       placeholder='Enter your postcode'
//                       className='p-2 rounded-md w-full'
//                       value={postcode}
//                       onChange={(e) => setPostcode(e.target.value)} />
//                   </div>
//                 </div>
//                 <div className='flex w-full gap-5'>
//                   <div className='flex flex-col space-y-1 w-full'>
//                     <label>Country</label>
//                     <input
//                       type="text"
//                       placeholder='Enter your country'
//                       className='p-2 rounded-md w-full'
//                       value={country}
//                       onChange={(e) => setCountry(e.target.value)} />
//                   </div>
//                   <div className='flex flex-col space-y-1 w-full'>
//                     <label>Phone No</label>
//                     <input
//                       type="text"
//                       placeholder='Enter your Number'
//                       className='p-2 rounded-md w-full'
//                       value={phone}
//                       onChange={(e) => setPhone(e.target.value)} />
//                   </div>
//                 </div>
//                 <button className='bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer hover:bg-neutral-300 hover:text-black transition-colors duration-300'>
//                   Submit
//                 </button>
//                 <div className='flex items-center justify-center w-full text-gray-700'>
//                   ---------OR-----------
//                 </div>
//                 <div className='flex justify-center'>
//                   <button
//                     onClick={getLocation}
//                     className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-neutral-300 hover:text-black transition-colors duration-300'>
//                     Detect Location
//                   </button>
//                 </div>
//               </div>

//               {/* Bill details */}
//               <div className='bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max'>
//                 <h1 className='text-gray-800 font-bold text-xl'>Bill details</h1>
//                 <div className='flex justify-between items-center'>
//                   <h1 className='flex gap-1 items-center text-gray-700'>
//                     <span><LuNotebookText /></span>Items total
//                   </h1>
//                   <p>${totalPrice}</p>
//                 </div>
//                 <div className='flex justify-between items-center'>
//                   <h1 className='flex gap-1 items-center text-gray-700'>
//                     <span><MdDeliveryDining /></span>Delivery Charge
//                   </h1>
//                   <p className='text-red-500 font-semibold'>
//                     <span className='text-gray-600 line-through'>$25</span> FREE
//                   </p>
//                 </div>
//                 <div className='flex justify-between items-center'>
//                   <h1 className='flex gap-1 items-center text-gray-700'>
//                     <span><GiShoppingBag /></span>Handling Charge
//                   </h1>
//                   <p className='text-red-500 font-semibold'>$5</p>
//                 </div>
//                 <hr className='text-gray-200 mt-2' />
//                 <div className='flex justify-between items-center'>
//                   <h1 className='font-semibold text-lg'>Grand total</h1>
//                   <p className='font-semibold text-lg'>${totalPrice + 5}</p>
//                 </div>
//                 <div>
//                   <h1 className='font-semibold text-gray-700 mb-3 mt-7'>Apply Promo Code</h1>
//                   <div className='flex gap-3'>
//                     <input
//                       type="text"
//                       placeholder='Enter code'
//                       className='p-2 rounded-md w-full'
//                     />
//                     <button className='bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md  hover:bg-neutral-300 hover:text-black transition-colors duration-300'>
//                       Apply
//                     </button>
//                   </div>
//                 </div>
//                 <button className='bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3 hover:bg-neutral-300 hover:text-black transition-colors duration-300'>
//                   Proceed to Checkout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className='flex flex-col gap-3 justify-center items-center h-[600px]'>
//           <h1 className='text-red-500/80 font-bold text-5xl text-muted'>
//             Oh no! Your cart is empty
//           </h1>
//           <img src={emptyCart} alt="Empty Cart" className='w-[400px]' />
//           <button
//             onClick={() => navigate('/products')}
//             className='bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer'>
//             Continue Shopping
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
