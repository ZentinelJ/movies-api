const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: String, enum: ["Activo", "Inactivo"], default: "Activo", required: true },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Genre", genreSchema);
