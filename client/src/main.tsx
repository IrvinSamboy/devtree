import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router/Router'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
    <ToastContainer aria-label={undefined} />
      <Router />
    </StrictMode>
  </QueryClientProvider>
)
