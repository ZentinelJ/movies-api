import api from "./api.js";

export const getMedia = async () => {
  const response = await api.get("/media");
  return response.data;
};

export const createMedia = async (media) => {
  const response = await api.post("/media", media);
  return response.data;
};

export const updateMedia = async (id, media) => {
  const response = await api.put(`/media/${id}`, media);
  return response.data;
};

export const deleteMedia = async (id) => {
  const response = await api.delete(`/media/${id}`);
  return response.data;
};
