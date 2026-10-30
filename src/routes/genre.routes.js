const router = require("express").Router();
const {
  getGenres,
  getGenreById,
  createGenre,
  updateGenre,
} = require("../controllers/genre.controller");

router.get("/", getGenres);
router.get("/:id", getGenreById);
router.post("/", createGenre);
router.put("/:id", updateGenre);

module.exports = router;
