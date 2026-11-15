import api from "./api.js";

export const getDirectors = async () => {
  const response = await api.get("/directors");
  return response.data;
};

export const createDirector = async (director) => {
  const response = await api.post("/directors", director);
  return response.data;
};

export const updateDirector = async (id, director) => {
  const response = await api.put(`/directors/${id}`, director);
  return response.data;
};
