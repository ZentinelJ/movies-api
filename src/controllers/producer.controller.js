const Producer = require("../models/producer.model");

const handleError = (res, error) => {
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ message: error.message });
  }
  res.status(500).json({ message: "Error inesperado del servidor" });
};

const getProducers = async (req, res) => {
  try {
    const producers = await Producer.find();
    res.status(200).json(producers);
  } catch (error) {
    handleError(res, error);
  }
};

const getProducerById = async (req, res) => {
  try {
    const producer = await Producer.findById(req.params.id);
    if (!producer) {
      return res.status(404).json({ message: "Productora no encontrada" });
    }
    res.status(200).json(producer);
  } catch (error) {
    handleError(res, error);
  }
};

const createProducer = async (req, res) => {
  try {
    const { name, status, slogan, description } = req.body || {};
    const producer = await Producer.create({
      name,
      status,
      slogan,
      description,
    });
    res.status(201).json(producer);
  } catch (error) {
    handleError(res, error);
  }
};

const updateProducer = async (req, res) => {
  try {
    const { name, status, slogan, description } = req.body || {};
    const producer = await Producer.findByIdAndUpdate(
      req.params.id,
      { name, status, slogan, description },
      { returnDocument: "after", runValidators: true }
    );
    if (!producer) {
      return res.status(404).json({ message: "Productora no encontrada" });
    }
    res.status(200).json(producer);
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  getProducers,
  getProducerById,
  createProducer,
  updateProducer,
};
