const Media = require("../models/media.model");
const Genre = require("../models/genre.model");
const Director = require("../models/director.model");
const Producer = require("../models/producer.model");
const Type = require("../models/type.model");

const POPULATE_FIELDS = ["genre", "director", "producer", "type"];

const handleError = (res, error) => {
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ message: error.message });
  }
  if (error.code === 11000) {
    return res.status(409).json({ message: "El serial o la URL ya existen" });
  }
  res.status(500).json({ message: "Error inesperado del servidor" });
};

// Revisa solo las referencias que llegan; devuelve el mensaje de error o null
const findReferenceError = async ({ genre, director, producer, type }) => {
  if (genre) {
    const found = await Genre.findById(genre);
    if (!found || found.status !== "Activo") {
      return "El género no existe o no está activo";
    }
  }
  if (director) {
    const found = await Director.findById(director);
    if (!found || found.status !== "Activo") {
      return "El director no existe o no está activo";
    }
  }
  if (producer) {
    const found = await Producer.findById(producer);
    if (!found || found.status !== "Activo") {
      return "La productora no existe o no está activa";
    }
  }
  if (type) {
    const found = await Type.findById(type);
    if (!found) {
      return "El tipo no existe";
    }
  }
  return null;
};

const getMedia = async (req, res) => {
  try {
    const media = await Media.find().populate(POPULATE_FIELDS);
    res.status(200).json(media);
  } catch (error) {
    handleError(res, error);
  }
};

const getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id).populate(POPULATE_FIELDS);
    if (!media) {
      return res.status(404).json({ message: "Media no encontrada" });
    }
    res.status(200).json(media);
  } catch (error) {
    handleError(res, error);
  }
};

const createMedia = async (req, res) => {
  try {
    const {
      serial,
      title,
      synopsis,
      url,
      coverImage,
      releaseYear,
      genre,
      director,
      producer,
      type,
    } = req.body || {};
    const message = await findReferenceError({ genre, director, producer, type });
    if (message) {
      return res.status(400).json({ message });
    }
    const media = await Media.create({
      serial,
      title,
      synopsis,
      url,
      coverImage,
      releaseYear,
      genre,
      director,
      producer,
      type,
    });
    res.status(201).json(media);
  } catch (error) {
    handleError(res, error);
  }
};

const updateMedia = async (req, res) => {
  try {
    const {
      serial,
      title,
      synopsis,
      url,
      coverImage,
      releaseYear,
      genre,
      director,
      producer,
      type,
    } = req.body || {};
    const message = await findReferenceError({ genre, director, producer, type });
    if (message) {
      return res.status(400).json({ message });
    }
    const media = await Media.findByIdAndUpdate(
      req.params.id,
      {
        serial,
        title,
        synopsis,
        url,
        coverImage,
        releaseYear,
        genre,
        director,
        producer,
        type,
      },
      { returnDocument: "after", runValidators: true }
    );
    if (!media) {
      return res.status(404).json({ message: "Media no encontrada" });
    }
    res.status(200).json(media);
  } catch (error) {
    handleError(res, error);
  }
};

const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) {
      return res.status(404).json({ message: "Media no encontrada" });
    }
    res.status(200).json({ message: "Media eliminada" });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { getMedia, getMediaById, createMedia, updateMedia, deleteMedia };
