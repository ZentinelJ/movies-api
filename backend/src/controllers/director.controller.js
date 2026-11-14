const Director = require("../models/director.model");

const handleError = (res, error) => {
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ message: error.message });
  }
  res.status(500).json({ message: "Error inesperado del servidor" });
};

const getDirectors = async (req, res) => {
  try {
    const directors = await Director.find();
    res.status(200).json(directors);
  } catch (error) {
    handleError(res, error);
  }
};

const getDirectorById = async (req, res) => {
  try {
    const director = await Director.findById(req.params.id);
    if (!director) {
      return res.status(404).json({ message: "Director no encontrado" });
    }
    res.status(200).json(director);
  } catch (error) {
    handleError(res, error);
  }
};

const createDirector = async (req, res) => {
  try {
    const { names, status } = req.body || {};
    const director = await Director.create({ names, status });
    res.status(201).json(director);
  } catch (error) {
    handleError(res, error);
  }
};

const updateDirector = async (req, res) => {
  try {
    const { names, status } = req.body || {};
    const director = await Director.findByIdAndUpdate(
      req.params.id,
      { names, status },
      { returnDocument: "after", runValidators: true }
    );
    if (!director) {
      return res.status(404).json({ message: "Director no encontrado" });
    }
    res.status(200).json(director);
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  getDirectors,
  getDirectorById,
  createDirector,
  updateDirector,
};
