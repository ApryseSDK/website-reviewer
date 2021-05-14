import { Box } from "@chakra-ui/layout";
import { useContext, useEffect, useRef } from "react";
import CollabClient from "../context/CollabClient";
import WebViewerContext from "../context/WebViewer";
import WebviewerHTMLContext from '../context/WebViewerHTML';

export default function WebViewerWrapper() {

  const ref = useRef();
  const client = useContext(CollabClient);
  const { setInstance, instance } = useContext(WebViewerContext);
  const { setHtmlInstance } = useContext(WebviewerHTMLContext);

  useEffect(() => {
    // IIFE for access to async
    (async () => {

      // These need to be dynamically imported, since they rely on "window" which does not exist on the server
      const { default: WebViewer } = await import('@pdftron/webviewer');
      const { initializeHTMLViewer } = await import('@pdftron/webviewer-html')
      const instance = await WebViewer({
        path: '/webviewer'
      }, ref.current)
      setInstance(instance)
      const htmlInstance = await initializeHTMLViewer(instance);
      setHtmlInstance(htmlInstance);
    })()
  }, [])

  useEffect(() => {
    if (client && instance) {
      // @ts-ignore
      client.setInstance(instance)
    }
  }, [client, instance])

  return (
    <Box
      ref={ref}
      w='100%'
      h='100%'
    >

    </Box>
  )

}