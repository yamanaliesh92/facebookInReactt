import { FC, PropsWithChildren } from "react";
import { ProviderContext } from "../context/userContext";
import { NewProviderContext } from "../context/UserNewContext";
import { MainRouterProvider } from "../router";
import { QueryProviders } from "./providerQuery";

export const Providers: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <QueryProviders>
      <ProviderContext>
        <>
          <MainRouterProvider />
          {children}
        </>
      </ProviderContext>
    </QueryProviders>
  );
};
