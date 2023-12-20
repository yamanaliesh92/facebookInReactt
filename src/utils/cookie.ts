import cookies from "js-cookie";

type nameCookies = "MyToken";

export function setToken(name: nameCookies, value: string) {
  return cookies.set(name, value);
}

export function getToken(name: nameCookies) {
  return cookies.get(name);
}

export function removeToken(name: nameCookies) {
  return cookies.remove(name);
}
