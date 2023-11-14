import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppContext, defaultCtx } from './store.ts';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={defaultCtx}>
        <App />
      </AppContext.Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
