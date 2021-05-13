import { createContext } from "react";
import type CollabClient from '@pdftron/collab-client';

export default createContext<CollabClient>(null);