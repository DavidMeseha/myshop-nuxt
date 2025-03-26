export function getLastPageBeforSignUp() {
  return localStorage.getItem("lastRouteBeforeLogin") ?? "/";
}

export function setLastPageBeforSignUp(url: string) {
  localStorage.setItem("lastRouteBeforeLogin", url);
}

export function getToken() {
  return localStorage.getItem("token") ?? "";
}

export function setToken(token: string) {
  return localStorage.setItem("token", token);
}
