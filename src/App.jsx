import { useEffect, useState } from 'react';
import createAppStore from '@/store';
import MainLoader from '@/components/layout/MainLoader';
import { Provider as StoreProvider } from 'react-redux';
import RouteProvider from '@/components/layout/RouteProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import PaymentGatewayProvider from '@/components/context/payment-gateway/PaymentGatewayProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: Boolean(import.meta.env?.PROD)
    }
  }
});

const App = () => {
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState(null);

  useEffect(() => {
    const initStore = async () => {
      try {
        const store = await createAppStore();
        setStore(store);
      } catch (error) {
        setStore(null);
      } finally {
        setLoading(false);
      }
    };
    initStore();
  }, []);

  if (loading) {
    return <MainLoader />;
  } else if (!store) {
    return (
      <div className="flex-center h-screen w-screen font-bold">
        Failed to load...
      </div>
    );
  } else {
    return (
      <StoreProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <PaymentGatewayProvider>
            <RouteProvider />

            <ToastContainer
              autoClose={8000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </PaymentGatewayProvider>
        </QueryClientProvider>
      </StoreProvider>
    );
  }
};

export default App;
