export async function getKnownDevices(ip) {
  try {
    const response = await fetch(`${ip}/api/location/devices`, {
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

export async function getLocations(ip) {
  try {
    const response = await fetch(`${ip}/api/location/latest`, {
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
    const response = await fetch(`${ip}/api/location/latest/${deviceName}`, {
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
