import api from "./api.js";

export const getProducers = async () => {
  const response = await api.get("/producers");
  return response.data;
};

export const createProducer = async (producer) => {
  const response = await api.post("/producers", producer);
  return response.data;
};

export const updateProducer = async (id, producer) => {
  const response = await api.put(`/producers/${id}`, producer);
  return response.data;
};
