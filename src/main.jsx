import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrandProvider } from './context/BrandContext'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrandProvider>
      <App />
    </BrandProvider>
  </StrictMode>,
)
