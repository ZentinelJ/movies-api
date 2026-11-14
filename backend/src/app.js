require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

// Permite que el frontend (otro origen, p. ej. localhost:5173) consuma la API
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API de películas funcionando" });
});

// Rutas de cada módulo
app.use("/api/genres", require("./routes/genre.routes"));
app.use("/api/directors", require("./routes/director.routes"));
app.use("/api/producers", require("./routes/producer.routes"));
app.use("/api/types", require("./routes/type.routes"));
app.use("/api/media", require("./routes/media.routes"));

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
});
