import { createContext, useContext } from "react";

const SearchContext = createContext<string>("");

export const SearchProvider = SearchContext.Provider;

export function useSearch(): string {
  return useContext(SearchContext);
}
