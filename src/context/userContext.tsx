import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useQuery } from "react-query";

import { getMe, MeDate } from "../axios/user/me.api";

export enum ActionUser {
  "LOGIN" = "LOGIN",
  "LOGOUT" = "LOGOUT",
  "SET_LOADING" = "SET_LOADING",
}

export interface IUser {
  email: string;
  username: string;
  password: string;
  isAunticated: boolean;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  login: (payload: IpayloadLogin) => void;
  manuallyLogin: (payload: IpayloadLogin) => void;
  logout: () => void;
  data?: MeDate;
  manualLogin?: boolean;
}

const initState: IUser = {
  email: "",
  password: "",
  username: "",
  login: () => {},
  manuallyLogin: () => {},
  logout: () => {},
  setLoading: () => {},
  isAunticated: false,
  manualLogin: false,
  isLoading: false,
};

interface IpayloadLogin {
  email: string;
  // manualLogin?: boolean;
}

interface IActioLogin {
  type: ActionUser.LOGIN;
  payload: IpayloadLogin;
}

interface IActionLogout {
  type: ActionUser.LOGOUT;
}

interface IActionSetLoading {
  type: ActionUser.SET_LOADING;
  loading: boolean;
}

type ACtion = IActioLogin | IActionLogout | IActionSetLoading;

const reduce = (prev: IUser, action: ACtion) => {
  switch (action.type) {
    case ActionUser.SET_LOADING: {
      return { ...prev, isLoading: action.loading };
    }

    case ActionUser.LOGIN: {
      console.log("prev", { prev, action });
      return {
        ...prev,
        email: action.payload.email,
        isAunticated: true,
      };
    }
    case ActionUser.LOGOUT: {
      console.log("logout", { prev, action });
      return {
        ...prev,
        email: "",
        username: "",
        isLoading: false,
        password: "",
        isAunticated: false,
      };
    }
    default:
      return prev;
  }
};

export const ContextUser = createContext(initState);

export const ProviderContext: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { error, data, isLoading } = useQuery<MeDate, unknown>(
    "meQuery",
    getMe
    // { enabled: true, cacheTime: 0, retry: true }
  );
  const [state, dispatch] = useReducer(reduce, initState);

  const login = useCallback((payload: IpayloadLogin) => {
    dispatch({ type: ActionUser.LOGIN, payload });
  }, []);

  // const manuallyLogin = useCallback((payload: IpayloadLogin) => {
  //   dispatch({
  //     type: ActionUser.LOGIN,
  //     payload: { ...payload, manualLogin: true },
  //   });
  // }, []);

  const logout = useCallback(() => {
    dispatch({ type: ActionUser.LOGOUT });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: ActionUser.SET_LOADING, loading });
  }, []);

  useEffect(() => {
    if (data) {
      login({ email: data.data.email });
      return setLoading(false);
    }

    if (error) {
      dispatch({ type: ActionUser.LOGOUT });
    }
  }, [data, error, login, isLoading, setLoading]);

  const value = useMemo(() => {
    return { ...state, login, logout, data, setLoading };
  }, [state, login, logout, data, setLoading]);

  return <ContextUser.Provider value={value}>{children}</ContextUser.Provider>;
};
