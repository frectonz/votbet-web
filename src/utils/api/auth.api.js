import { API_URL } from "./api";

export const register = async ({ name, email, password }) => {
  let res;
  try {
    res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
  } catch (error) {
    return error;
  }
  const json = await res.json();
  return json;
};

export const login = async ({ email, password }) => {
  let res;
  try {
    res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  } catch (error) {
    return error;
  }

  const json = await res.json();
  return json;
};

export const addBio = async (token, bio) => {
  let res;

  try {
    res = await fetch(`${API_URL}/auth/bio`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bio,
      }),
    });
  } catch (error) {
    return error;
  }
  const json = await res.json();
  return json;
};

export const updateDetails = async (token, { name, email }) => {
  let res;

  try {
    res = await fetch(`${API_URL}/auth/updateDetails`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });
  } catch (error) {
    return error;
  }
  const json = await res.json();
  return json;
};

export const updatePassword = async (token, { newPassword, oldPassword }) => {
  let res;

  try {
    res = await fetch(`${API_URL}/auth/updatePassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        newPassword,
        oldPassword,
      }),
    });
  } catch (error) {
    return error;
  }
  const json = await res.json();
  return json;
};

export const getMe = async (token) => {
  let res;

  try {
    res = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
  const json = await res.json();
  return json;
};
