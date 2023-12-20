import { FC, PropsWithChildren, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContextUser } from "../context/userContext";

export const PrivateRouter: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { isAunticated, isLoading } = useContext(ContextUser);
  const navgiate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!isAunticated) {
      navgiate("/auth");
    }
  }, [isAunticated, navgiate, isLoading]);

  if (isLoading) {
    return <h1>loading....</h1>;
  }
  return <>{children}</>;
};
