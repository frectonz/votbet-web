import { API_URL } from "./api";

export const createEvent = async ({
  token,
  name,
  description,
  startDate,
  endDate,
}) => {
  let res;
  try {
    res = await fetch(`${API_URL}/events/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description, startDate, endDate }),
    });
  } catch (error) {
    return error;
  }
  const json = await res.json();
  return json;
};

export const getAllEvents = async (token, { filter, limit, page, sortBy }) => {
  let res;
  try {
    res = await fetch(
      `${API_URL}/events/?filter=${filter}&limit=${limit}&page=${page}&sortBy=${sortBy}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return error;
  }
  const json = await res.json();
  return json;
};

export const getEventById = async (token, id) => {
  let res;
  try {
    res = await fetch(`${API_URL}/events/${id}`, {
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

export const updateEventById = async (token, id, { name, description }) => {
  let res;
  try {
    res = await fetch(`${API_URL}/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description }),
    });
  } catch (error) {
    return error;
  }
  const json = await res.json();
  return json;
};

export const deleteEventById = async (token, id) => {
  let res;
  try {
    res = await fetch(`${API_URL}/events/${id}`, {
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

export const watchEventById = async (token, id) => {
  let res;
  try {
    res = await fetch(`${API_URL}/events/${id}/watch`, {
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

export const eventsBeingWatched = async (token) => {
  let res;
  try {
    res = await fetch(`${API_URL}/events/watching`, {
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

export const searchEvents = async (token, limit = 10, searchString) => {
  let res;
  try {
    res = await fetch(`${API_URL}/events/search?limit=${limit}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ searchString }),
    });
  } catch (error) {
    return error;
  }
  const json = await res.json();
  return json;
};

export const uploadImage = async (token, id, base64Picture) => {
  let res;
  try {
    res = await fetch(`${API_URL}/events/${id}/picture`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        image: base64Picture,
      }),
    });
  } catch (error) {
    return error;
  }
  const json = await res.json();
  return json;
};
