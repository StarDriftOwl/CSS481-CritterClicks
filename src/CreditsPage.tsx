import React from 'react'
import ReactDOM from 'react-dom/client'
import Credits from './Credits'

// Make sure the element exists
const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Credits />
  </React.StrictMode>,
)