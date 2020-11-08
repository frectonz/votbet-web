import { API_URL } from "./api";

export const createComment = async (token, { text, eventId }) => {
  let res;
  try {
    res = await fetch(`${API_URL}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text, eventId }),
    });
  } catch (error) {
    return error;
  }
  const json = await res.json();
  return json;
};

export const updateComment = async (token, id, { text }) => {
  let res;
  try {
    res = await fetch(`${API_URL}/comments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });
  } catch (error) {
    return error;
  }
  const json = await res.json();
  return json;
};

export const deleteComment = async (token, id) => {
  let res;
  try {
    res = await fetch(`${API_URL}/comments/${id}`, {
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
