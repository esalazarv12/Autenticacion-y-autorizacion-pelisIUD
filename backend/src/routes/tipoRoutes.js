const express = require("express");
const router = express.Router();
const {
  getTipos,
  createTipo,
  updateTipo,
  deleteTipo
} = require("../controllers/tipoController");

const authMiddleware = require("../middlewares/authMiddleware");

// Middleware: Solo administradores
const adminOnly = (req, res, next) => {
  if (req.user.rol !== "administrador") {
    return res.status(403).json({ error: "Acceso denegado: Solo administradores" });
  }
  next();
};


//RUTA: Obtener tipos (cualquier usuario autenticado)
router.get("/", authMiddleware, getTipos);

//RUTAS: Solo administrador
router.post("/", authMiddleware, adminOnly, createTipo);
router.put("/:id", authMiddleware, adminOnly, updateTipo);
router.delete("/:id", authMiddleware, adminOnly, deleteTipo);

module.exports = router;
