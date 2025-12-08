const express = require("express");
const router = express.Router();
const {
  getProductoras,
  createProductora,
  updateProductora,
  deleteProductora
} = require("../controllers/productoraController");

const authMiddleware = require("../middlewares/authMiddleware");

// Middleware: Solo administradores
const adminOnly = (req, res, next) => {
  if (req.user.rol !== "administrador") {
    return res.status(403).json({ error: "Acceso denegado: Solo administradores" });
  }
  next();
};


//RUTA: Obtener productoras (cualquier usuario autenticado)
router.get("/", authMiddleware, getProductoras);

//RUTAS: Solo administrador
router.post("/", authMiddleware, adminOnly, createProductora);
router.put("/:id", authMiddleware, adminOnly, updateProductora);
router.delete("/:id", authMiddleware, adminOnly, deleteProductora);

module.exports = router;
