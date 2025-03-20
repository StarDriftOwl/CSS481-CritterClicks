{
  /* <p class="galleryLabel">Ghost Cat:</p>
<img src="Pictures/ghostcat1.png" class="galleryCell">
<img src="Pictures/ghostcat2.png" class="galleryCell"> */
}

import React from "react";
import ReactDOM from 'react-dom/client'
import Gallery from './gallery'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Gallery />
  </React.StrictMode>,
)
