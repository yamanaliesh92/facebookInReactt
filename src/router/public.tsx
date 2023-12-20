import { FC, PropsWithChildren, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ContextUser } from "../context/userContext";

export const PublicRouter: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { isAunticated, isLoading } = useContext(ContextUser);
  const location = useLocation();
  const navgiate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (isAunticated) {
      navgiate("/");
    }
  }, [isAunticated, navgiate, isLoading, location.pathname]);

  if (isLoading) {
    return <h1>loading....</h1>;
  }
  return <>{children}</>;
};
