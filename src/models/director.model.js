const mongoose = require("mongoose");

const directorSchema = new mongoose.Schema(
  {
    names: { type: String, required: true },
    status: { type: String, enum: ["Activo", "Inactivo"], default: "Activo", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Director", directorSchema);
