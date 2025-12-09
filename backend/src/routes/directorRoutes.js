const express = require("express");
const router = express.Router();
const {
  getDirectores,
  createDirector,
  updateDirector,
  deleteDirector
} = require("../controllers/directorController");

const authMiddleware = require("../middlewares/authMiddleware");

// Middleware: Solo administradores
const adminOnly = (req, res, next) => {
  if (req.user.rol !== "administrador") {
    return res.status(403).json({ error: "Acceso denegado: Solo administradores" });
  }
  next();
};

// Obtener directores (cualquier usuario autenticado)
router.get("/", authMiddleware, getDirectores);

// Crear director (solo admin)
router.post("/", authMiddleware, adminOnly, createDirector);

// Editar director (solo admin)
router.put("/:id", authMiddleware, adminOnly, updateDirector);

// Eliminar director (solo admin)
router.delete("/:id", authMiddleware, adminOnly, deleteDirector);

module.exports = router;
