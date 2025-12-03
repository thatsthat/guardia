import { createContext } from "react-router";
import { type Session } from "react-router";

export const sessionContext = createContext<Session | null>(null);
