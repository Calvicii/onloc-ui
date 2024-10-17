export async function getLocations(ip) {
  try {
    const response = await fetch(`${ip}/api/locations?filter=latest`, {
      method: "GET",
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching coordinates: ${error}`);
    return [];
  }
}

export async function getLocation(ip, deviceName) {
  try {
    const response = await fetch(`${ip}/api/locations?filter=latest&deviceId=${deviceName}`, {
      method: "GET",
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return [data];
  } catch (error) {
    console.error(`Error fetching coordinates: ${error}`);
    return [];
  }
}

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