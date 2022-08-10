import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Navigate } from '../store/navigate';
import { Snackbar } from '../store/snackbar';
import { SnackbarProvider } from 'notistack';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <Snackbar>
        <Navigate>
          <Component {...pageProps} />
        </Navigate>
      </Snackbar>
    </SnackbarProvider>

    
  )
}

export default MyApp
