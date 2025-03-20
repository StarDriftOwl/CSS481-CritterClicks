import React from 'react'
import ReactDOM from 'react-dom/client'
import Settings from './Settings'

// Make sure the element exists
const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Settings />
  </React.StrictMode>,
)