import { API_URL } from "./api";

export const createCanidate = async (token, { name, description, eventId }) => {
  let res;
  try {
    res = await fetch(`${API_URL}/canidates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        eventId,
      }),
    });
  } catch (error) {
    return error;
  }
  const json = await res.json();
  return json;
};

export const getCanidate = async (token, id) => {
  let res;
  try {
    res = await fetch(`${API_URL}/canidates/${id}`, {
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

export const updateCanidate = async (token, id, { name, description }) => {
  let res;
  try {
    res = await fetch(`${API_URL}/canidates/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
  } catch (error) {
    return error;
  }
  const json = await res.json();
  return json;
};

export const deleteCanidate = async (token, id) => {
  let res;
  try {
    res = await fetch(`${API_URL}/canidates/${id}`, {
      method: "DELETE",
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

export const toggleVoteToCanidate = async (token, id) => {
  let res;
  try {
    res = await fetch(`${API_URL}/canidates/${id}/vote`, {
      method: "PUT",
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
