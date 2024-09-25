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
