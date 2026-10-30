const Genre = require("../models/genre.model");

const handleError = (res, error) => {
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ message: error.message });
  }
  res.status(500).json({ message: "Error inesperado del servidor" });
};

const getGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    handleError(res, error);
  }
};

const getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      return res.status(404).json({ message: "Género no encontrado" });
    }
    res.status(200).json(genre);
  } catch (error) {
    handleError(res, error);
  }
};

const createGenre = async (req, res) => {
  try {
    const { name, status, description } = req.body || {};
    const genre = await Genre.create({ name, status, description });
    res.status(201).json(genre);
  } catch (error) {
    handleError(res, error);
  }
};

const updateGenre = async (req, res) => {
  try {
    const { name, status, description } = req.body || {};
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name, status, description },
      { returnDocument: "after", runValidators: true }
    );
    if (!genre) {
      return res.status(404).json({ message: "Género no encontrado" });
    }
    res.status(200).json(genre);
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { getGenres, getGenreById, createGenre, updateGenre };
