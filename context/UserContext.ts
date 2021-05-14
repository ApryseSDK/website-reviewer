import { createContext } from "react";

export type AuthUser = {
  id: string;
  email: string;
}

export type UserState = {
  user: AuthUser,
  setUser: (user: AuthUser) => void
}

export default createContext<UserState>(null)