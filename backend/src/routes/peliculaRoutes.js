const express = require("express");
const router = express.Router();

const {
  getPeliculas,
  createPelicula,
  updatePelicula,
  deletePelicula
} = require("../controllers/peliculaController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// Ver películas (administrador o docente)
router.get("/", authMiddleware, roleMiddleware("administrador", "docente"), getPeliculas);

// Crear película (solo administrador)
router.post("/", authMiddleware, roleMiddleware("administrador"), createPelicula);

// Editar película (solo administrador)
router.put("/:id", authMiddleware, roleMiddleware("administrador"), updatePelicula);

// Eliminar película (solo administrador)
router.delete("/:id", authMiddleware, roleMiddleware("administrador"), deletePelicula);

module.exports = router;
