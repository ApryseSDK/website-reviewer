import { createContext } from "react";
import type { WebViewerInstance } from '@pdftron/webviewer';

export type WebViewerState = {
  instance: WebViewerInstance,
  setInstance: (instance: WebViewerInstance) => void;
}

export default createContext<WebViewerState>(null);