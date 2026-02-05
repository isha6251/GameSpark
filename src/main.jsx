import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { DataProvider } from './context/DataContext'
import { CartProvider } from './context/CartProvider'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from 'react-scroll-to-top'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <DataProvider>
    <CartProvider>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
        <ScrollToTop color='white' smooth style={{ backgroundColor: '#72b4fd', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
        <ToastContainer
          position="bottom-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ClerkProvider>
    </CartProvider>
  </DataProvider>
  // </StrictMode>,
)