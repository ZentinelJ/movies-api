const Type = require("../models/type.model");

const handleError = (res, error) => {
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ message: error.message });
  }
  res.status(500).json({ message: "Error inesperado del servidor" });
};

const getTypes = async (req, res) => {
  try {
    const types = await Type.find();
    res.status(200).json(types);
  } catch (error) {
    handleError(res, error);
  }
};

const getTypeById = async (req, res) => {
  try {
    const type = await Type.findById(req.params.id);
    if (!type) {
      return res.status(404).json({ message: "Tipo no encontrado" });
    }
    res.status(200).json(type);
  } catch (error) {
    handleError(res, error);
  }
};

const createType = async (req, res) => {
  try {
    const { name, description } = req.body || {};
    const type = await Type.create({ name, description });
    res.status(201).json(type);
  } catch (error) {
    handleError(res, error);
  }
};

const updateType = async (req, res) => {
  try {
    const { name, description } = req.body || {};
    const type = await Type.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { returnDocument: "after", runValidators: true }
    );
    if (!type) {
      return res.status(404).json({ message: "Tipo no encontrado" });
    }
    res.status(200).json(type);
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { getTypes, getTypeById, createType, updateType };
