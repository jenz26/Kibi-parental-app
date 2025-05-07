import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './app/store.js'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background: '#363636', // Default background for toasts
            color: '#fff',
          },
          success: {
            duration: 3000,
            className: 'toast-success', // Custom class for styling
            iconTheme: {
              primary: '#fff',
              secondary: '#10B981',
            },
          },
          error: {
            duration: 5000,
            className: 'toast-error',
            iconTheme: {
              primary: '#fff',
              secondary: '#EF4444',
            },
          },
        }}
      />
    </Provider>
  </React.StrictMode>,
)