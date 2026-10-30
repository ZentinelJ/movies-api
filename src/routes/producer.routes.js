const router = require("express").Router();
const {
  getProducers,
  getProducerById,
  createProducer,
  updateProducer,
} = require("../controllers/producer.controller");

router.get("/", getProducers);
router.get("/:id", getProducerById);
router.post("/", createProducer);
router.put("/:id", updateProducer);

module.exports = router;
