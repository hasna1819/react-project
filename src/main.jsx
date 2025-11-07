import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './pages/index.css'
import Routes from './pages/Route.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
 <Routes/>
  </StrictMode>,
);
