export async function getStatus() {
  try {
    const response = await fetch("http://localhost:8000/api/status");

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, message: data.message, error: true };
    }

    return data;
  } catch (error) {
    console.error(error);
    if (!error.status) {
      console.log(error);
      return { message: error.message, error: true };
    }
    return error;
  }
}

export async function userInfo(token) {
  try {
    const response = await fetch("http://localhost:8000/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, message: data.message, error: true };
    }

    return data;
  } catch (error) {
    console.error(error);
    if (!error.status) {
      console.log(error);
      return { message: error.message, error: true };
    }
    return error;
  }
}

export async function login(username, password) {
  try {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, message: data.message, error: true };
    }

    return data;
  } catch (error) {
    console.error(error);
    if (!error.status) {
      console.log(error);
      return { message: error.message, error: true };
    }
    return error;
  }
}

export async function register(username, password, passwordConfirmation) {
  try {
    const response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        password_confirmation: passwordConfirmation,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, message: data.message, error: true };
    }

    return data;
  } catch (error) {
    console.error(error);
    if (!error.status) {
      console.log(error);
      return { message: error.message, error: true };
    }
    return error;
  }
}

export async function logout(token) {
  try {
    const response = await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, message: data.message, error: true };
    }

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getSessions(token) {
  try {
    const response = await fetch("http://localhost:8000/api/user/tokens", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, message: data.message, error: true };
    }

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function deleteSession(token, id) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/user/tokens/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, message: data.message, error: true };
    }

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getDevices(token) {
  try {
    const response = await fetch("http://localhost:8000/api/devices", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, message: data.message, error: true };
    }

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function postDevice(token, device) {
  try {
    const response = await fetch("http://localhost:8000/api/devices", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: device.name,
        icon: device.icon,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, message: data.message, error: true };
    }

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function deleteDevice(token, id) {
  try {
    const response = await fetch(`http://localhost:8000/api/devices/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, message: data.message, error: true };
    }

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getSettings(token) {
  try {
    const response = await fetch("http://localhost:8000/api/settings", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, message: data.message, error: true };
    }

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function postSetting(token, setting) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/settings`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: setting.key,
          value: setting.value,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, message: data.message, error: true };
    }

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function patchSetting(token, setting) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/settings/${setting.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: setting.key,
          value: setting.value,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, message: data.message, error: true };
    }

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
