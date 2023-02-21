import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "../styles/globals.css"
import { Fragment, useEffect, useState } from 'react';
import { store, wrapper } from '../src/redux/store';
import PropTypes from 'prop-types';
import { Button, Checkbox, CssBaseline, Experimental_CssVarsProvider } from '@mui/material';
import Head from 'next/head';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { selectuser } from '../src/redux/reducers/userReducer';
import { getbalance, selectbalance } from '../src/redux/reducers/balanceReducer';
import { throttle } from 'lodash';
import { saveState } from '../src/redux/localstorage';

function MyApp({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const [ready, setready] = useState(false)
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)

    }
    setready(true)
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
        {ready &&   <Component {...pageProps} />}
      
      </Provider>
      </Experimental_CssVarsProvider>
  </Fragment>
}
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
export default MyApp
