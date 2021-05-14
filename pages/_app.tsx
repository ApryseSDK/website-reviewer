import { Box } from '@chakra-ui/layout';
import { ChakraProvider } from '@chakra-ui/react';
import App from 'next/app'
import UserContext, { AuthUser, UserState } from '../context/UserContext';
import theme from '../theme';
import cookie from "cookie"

import type CollabClientType from '@pdftron/collab-client';
import type WebViewerHTML from '@pdftron/webviewer-html';
import type { WebViewerInstance } from '@pdftron/webviewer';

import { useEffect, useMemo, useState } from 'react';

import CollabClientContext from '../context/CollabClient';
import WebViewerContext, { WebViewerState } from '../context/WebViewer';
import WebViewerHTMLContext, { WebViewerHTMLState } from '../context/WebViewerHTML';
import { UserAuth } from '../auth';

function MyApp({ Component, pageProps, user: userProp, token }) {

  const [collabClient, setCollabClient] = useState<CollabClientType>()
  const [instance, setInstance] = useState<WebViewerInstance>();
  const [user, setUser] = useState<AuthUser>(userProp);
  const [htmlInstance, setHtmlInstance] = useState<ReturnType<WebViewerHTML>>();


  useEffect(() => {
    // IIFE for access to async
    (async () => {
      const { default: CollabClient } = await import('@pdftron/collab-client')
      const client = new CollabClient({
        url: process.env.NEXT_PUBLIC_SERVER_URL,
        subscriptionUrl: process.env.NEXT_PUBLIC_SUBSCRIPTION_URL
      });
      
      if (token) {
        await client.loginWithToken(token)
      }

      setCollabClient(client)
    })()
    
  }, [])

  const webviewerInstanceState = useMemo<WebViewerState>(() => ({
    instance,
    setInstance
  }), [instance])

  const webviewerHtmlState = useMemo<WebViewerHTMLState>(() => ({
    htmlInstance,
    setHtmlInstance
  }), [htmlInstance])

  const userState = useMemo<UserState>(() => ({
    user,
    setUser
  }), [user])

  return (
    <ChakraProvider theme={theme}>
      <WebViewerHTMLContext.Provider value={webviewerHtmlState}>
        <WebViewerContext.Provider value={webviewerInstanceState}>
          <CollabClientContext.Provider value={collabClient}>
            <UserContext.Provider value={userState}>
              <Box w='100vw' h='100vh'>
                <Component {...pageProps} />
              </Box>
            </UserContext.Provider>
          </CollabClientContext.Provider>
        </WebViewerContext.Provider>
      </WebViewerHTMLContext.Provider>
    </ChakraProvider>
  )
}

MyApp.getInitialProps = async (appContext) => {

  let c = {};
  if (appContext.ctx.req) {
    c = cookie.parse(appContext.ctx.req.headers.cookie || '');
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/session?cookie=${c['wv-collab-token']}`, { credentials: 'include' });
  let user;
  let token;
  const appProps = await App.getInitialProps(appContext);

  if (response.status === 200) {
    const json = await response.json()
    user = json.user
    token = json.token;
  }

  if (!user && appContext.ctx.req.url !== '/login' && appContext.ctx.req.url !== '/sign-up') {
    appContext.ctx.res.redirect('/login');
    return;
  }

  return { ...appProps, user, token }
}

export default MyApp
