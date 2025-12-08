const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "clave_secreta"
    );

    req.user = decoded; // { id, email, rol }

    next();
  } catch (error) {
    console.error("Error en authMiddleware:", error.message);
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};

module.exports = authMiddleware;
