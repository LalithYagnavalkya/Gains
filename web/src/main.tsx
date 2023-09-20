import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';

import { store } from './app/store';
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/theme-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
