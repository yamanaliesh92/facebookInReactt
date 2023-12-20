import { FC, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const QueryProviders: FC<PropsWithChildren<{}>> = ({ children }) => {
  const query = new QueryClient();

  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
};
