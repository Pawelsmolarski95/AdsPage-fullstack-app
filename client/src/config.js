export const API_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8000";

export const IMAGES_URL =
  process.env.NODE_ENV === "production"
    ? "public/uploads/"
    : "http://localhost:8000/uploads/";
