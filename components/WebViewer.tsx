import { Box } from "@chakra-ui/layout";
import { useContext, useEffect, useRef } from "react";
import CollabClient from "../context/CollabClient";

export default function WebViewerWrapper() {

  const ref = useRef();
  const client = useContext(CollabClient);

  useEffect(() => {
    // IIFE for access to async
    (async () => {
      const { default: WebViewer } = await import('@pdftron/webviewer');
      const instance = await WebViewer({
        path: '/webviewer'
      }, ref.current)

      client.setInstance(instance)

    })()
  }, [])

  return (
    <Box
      ref={ref}
      w='100%'
      h='100%'
    >

    </Box>
  )

}