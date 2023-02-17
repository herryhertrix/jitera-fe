import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "../styles/globals.css"
import { Fragment, useEffect } from 'react';
import { wrapper } from '../src/redux/store';
import PropTypes from 'prop-types';
import { Button, Checkbox, CssBaseline, Experimental_CssVarsProvider } from '@mui/material';
import Head from 'next/head';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)

    }
  }, []);
  return <Fragment>
    <Head>
      <title>My page</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>
      <Experimental_CssVarsProvider>

      
      <Provider store={store}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </Provider>
      </Experimental_CssVarsProvider>
  </Fragment>
}
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
export default MyApp
