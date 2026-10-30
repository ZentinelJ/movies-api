const router = require("express").Router();
const {
  getDirectors,
  getDirectorById,
  createDirector,
  updateDirector,
} = require("../controllers/director.controller");

router.get("/", getDirectors);
router.get("/:id", getDirectorById);
router.post("/", createDirector);
router.put("/:id", updateDirector);

module.exports = router;
