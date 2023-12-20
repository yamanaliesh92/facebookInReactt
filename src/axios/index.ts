import axios from "axios";

import { getToken } from "../utils/cookie";
import { getEnv } from "../utils/env";

export const http = axios.create({
  baseURL: getEnv({ IKey: "REACT_APP_SERVER" }),
});

const HEADER_NAME = "auth";

http.interceptors.request.use((config) => {
  const Token = getToken("MyToken");

  return {
    ...config,
    headers: {
      [HEADER_NAME]: Token,
    },
  } as any;
});

export {};
