import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo/client';
import MenuBar from '../components/MenuBar';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import { AuthProvider } from '../context/auth';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <div>
          <Head>
            <link
              rel='stylesheet'
              href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'
              integrity='sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=='
              crossOrigin='anonymous'
              referrerPolicy='no-referrer'
            />
          </Head>
          <MenuBar />
          <Component {...pageProps} />
        </div>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default MyApp;
