import { getApiIp } from "./storage";

export async function validateToken(authInfo) {
  if (authInfo.token && authInfo.user) {
    try {
      const response = await fetch(`${getApiIp()}/api/validate-token`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authInfo.token}`,
        },
      });

      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error validating token:", error);
      return false;
    }
  } else {
    return false;
  }
}

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

export async function getLocation(ip, deviceId) {
  try {
    const response = await fetch(
      `${ip}/api/locations?filter=latest&deviceId=${deviceId}`,
      {
        method: "GET",
      }
    );

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

export async function addDevice(ownerId, name) {
  try {
    const response = await fetch(`${getApiIp()}/api/devices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ownerId: ownerId,
        name: name,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed adding a new device");
    }

    return data;
  } catch (error) {
    console.error("Error adding a new device:", error);
  }
}

export async function getDevices(ip) {
  try {
    const response = await fetch(`${ip}/api/devices`, {
      method: "GET",
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching devices: ${error}`);
    return [];
  }
}
