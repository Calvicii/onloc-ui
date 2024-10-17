export function getApiIp() {
  const defaultIp = process.env.ONLOC_API_IP || "http://localhost:8118";
  return localStorage.getItem("apiIp") || defaultIp
}

export function storeToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function deleteToken() {
  localStorage.removeItem('token');
}