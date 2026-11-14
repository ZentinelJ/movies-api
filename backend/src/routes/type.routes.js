const router = require("express").Router();
const {
  getTypes,
  getTypeById,
  createType,
  updateType,
} = require("../controllers/type.controller");

router.get("/", getTypes);
router.get("/:id", getTypeById);
router.post("/", createType);
router.put("/:id", updateType);

module.exports = router;
