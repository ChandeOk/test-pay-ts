'use client';

import StyledComponentsRegistry from '@/lib/registry';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from '@/components/Global';
import Header from './Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <title>Plz pay</title>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Header />
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
