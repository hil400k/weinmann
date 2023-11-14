import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { QueryClientProvider } from '@tanstack/react-query';
import { AppContext, defaultCtx, queryClient } from './store.ts';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={defaultCtx}>
        <App />
      </AppContext.Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
