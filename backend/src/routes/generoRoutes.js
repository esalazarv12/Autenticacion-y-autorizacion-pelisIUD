const express = require("express");
const router = express.Router();
const generoController = require("../controllers/generoController");
const authMiddleware = require("../middlewares/authMiddleware");

// Middleware para permitir solo administradores
const adminOnly = (req, res, next) => {
  if (req.user.rol !== "administrador") {
    return res.status(403).json({ error: "Acceso denegado: Solo administradores" });
  }
  next();
};


//RUTA: Obtener géneros (cualquier usuario autenticado)
router.get("/", authMiddleware, generoController.getGeneros);

//RUTAS: Solo administrador
router.post("/", authMiddleware, adminOnly, generoController.createGenero);
router.put("/:id", authMiddleware, adminOnly, generoController.updateGenero);
router.delete("/:id", authMiddleware, adminOnly, generoController.deleteGenero);

module.exports = router;
