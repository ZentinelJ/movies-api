const mongoose = require("mongoose");

const producerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: String, enum: ["Activo", "Inactivo"], default: "Activo", required: true },
    slogan: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Producer", producerSchema);
