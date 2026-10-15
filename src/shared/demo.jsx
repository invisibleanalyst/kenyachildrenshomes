import React, { createContext, useContext, useReducer, useEffect } from "react";
import { initialState, reducer } from "./scenario";
const Context = createContext(null);
const key = "kch-scenario-v1";
function restore() {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (
      saved?.version === 1 &&
      saved.state?.payments &&
      saved.state?.enquiries &&
      saved.state?.events &&
      saved.state?.subscriptions
    )
      return saved.state;
  } catch {}
  return initialState();
}
export function DemoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, restore);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify({ version: 1, state }));
    } catch {}
  }, [state]);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}
export const useDemo = () => useContext(Context);
