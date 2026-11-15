import api from "./api.js";

export const getTypes = async () => {
  const response = await api.get("/types");
  return response.data;
};

export const createType = async (type) => {
  const response = await api.post("/types", type);
  return response.data;
};

export const updateType = async (id, type) => {
  const response = await api.put(`/types/${id}`, type);
  return response.data;
};
