'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { ThemeProvider } from '@/components/theme-provider';

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
        {children}
      </ThemeProvider>
    </Provider>
  );
}

export default ClientProvider;
