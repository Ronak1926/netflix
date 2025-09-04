import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Safe shim: some third-party embeds/extensions may call `debug(...)`.
// Define a no-op to prevent ReferenceError without altering app behavior.
if (typeof window !== 'undefined' && typeof window.debug === 'undefined') {
  // eslint-disable-next-line no-unused-vars
  window.debug = function () { /* no-op */ };
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
