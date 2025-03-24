export function getLastPageBeforSignUp() {
  return localStorage.getItem("lastRouteBeforeLogin") ?? "/";
}

export function setLastPageBeforSignUp(url: string) {
  localStorage.setItem("lastRouteBeforeLogin", url);
}

export function getToken() {
  return localStorage.getItem("token") ?? "";
}
