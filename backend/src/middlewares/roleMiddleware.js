// Middleware para validar roles
const roleMiddleware = (...rolesPermitidos) => {
  return (req, res, next) => {
    try {
      const usuario = req.user;

      if (!usuario || !rolesPermitidos.includes(usuario.rol)) {
        return res.status(403).json({
          error: "No tienes permisos para realizar esta acción"
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: "Error en validación de rol" });
    }
  };
};

module.exports = roleMiddleware;
