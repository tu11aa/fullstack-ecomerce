import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/auth/AuthContext';
import ShopProvider from './contexts/shop/ShopContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ModalProvider from './contexts/modal/ModalContext.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ShopProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
          {import.meta.env.MODE === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </ShopProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
