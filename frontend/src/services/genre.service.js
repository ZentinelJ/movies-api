import api from "./api.js";

export const getGenres = async () => {
  const response = await api.get("/genres");
  return response.data;
};

export const createGenre = async (genre) => {
  const response = await api.post("/genres", genre);
  return response.data;
};

export const updateGenre = async (id, genre) => {
  const response = await api.put(`/genres/${id}`, genre);
  return response.data;
};
