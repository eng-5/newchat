import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import {ThemesProvider} from './providers/ThemesProvider';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemesProvider>
    <App />
    </ThemesProvider>
  </StrictMode>,
)
