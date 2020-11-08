export const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_LOCAL_URL
    : process.env.REACT_APP_API_URL;

export * from "./auth.api";
export * from "./events.api";
export * from "./canidates.api";
export * from "./comments.api";
