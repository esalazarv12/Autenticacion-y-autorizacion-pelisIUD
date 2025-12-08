const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// Middleware: Solo administradores
const adminOnly = (req, res, next) => {
  if (req.user.rol !== "administrador") {
    return res.status(403).json({ error: "Acceso denegado: Solo administradores" });
  }
  next();
};

// Crear usuario — solo admin
router.post("/", authMiddleware, adminOnly, userController.createUser);

// Login — libre
router.post("/login", userController.login);

// Listar usuarios — solo admin
router.get("/", authMiddleware, adminOnly, userController.getUsers);

// Actualizar usuario — solo admin
router.put("/:id", authMiddleware, adminOnly, userController.updateUser);

// Eliminar usuario — solo admin
router.delete("/:id", authMiddleware, adminOnly, userController.deleteUser);

module.exports = router;
