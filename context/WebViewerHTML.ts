import { createContext } from "react";
import type WebViewerHTML from '@pdftron/webviewer-html';

export type WebViewerHTMLState = {
  htmlInstance: ReturnType<WebViewerHTML>,
  setHtmlInstance: (html: WebViewerHTML) => void;
}

export default createContext<WebViewerHTMLState>(null);