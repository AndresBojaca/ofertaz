'use client';

import { ReactNode, Suspense } from 'react';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { ThemeProvider } from '@/components/ThemeProvider';
import Spinner from '@/components/ui/spinner';

interface ClientProviderProps {
  children: ReactNode;
}

const ClientProvider = ({ children }: ClientProviderProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Suspense fallback={<Spinner />}>
          {children}
        </Suspense>
      </ThemeProvider>
    </Provider>
  );
}

export default ClientProvider;
