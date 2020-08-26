import '../styles/globals.css';
import 'weather-icons/css/weather-icons.css';
import type {AppProps} from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp;
