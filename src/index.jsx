import React from 'react'
import ReactDOM from 'react-dom/client'
// import { StarRating } from './StarRating.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={5} />
    <StarRating size={24} color="red" maxRating={5} /> */}
  </React.StrictMode>,
)
