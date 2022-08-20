
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import tippy from 'tippy.js';

import toast, { Toaster } from 'react-hot-toast';

import Layout from '../components/Layout';
import Head from 'next/head';

import '../styles/globals.css'
import '../styles/tailwind.css'
import 'tippy.js/dist/tippy.css'
import Script from 'next/script';


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    tippy('[data-tippy-content]');
  }, [])

  return <>

    <Head>
      <title>Fastcups | Stay in sync with your students</title>
    </Head>
    <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
    <Layout>
      <Component {...pageProps} />
    </Layout>
    <Toaster />
  </>
}

export default MyApp
