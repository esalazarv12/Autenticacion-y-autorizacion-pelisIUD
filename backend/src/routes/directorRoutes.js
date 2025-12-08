const express = require("express");
const router = express.Router();
const {
  getDirectores,
  createDirector,
  updateDirector,
  deleteDirector
} = require("../controllers/directorController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get("/", authMiddleware, roleMiddleware("administrador"), getDirectores);
router.post("/", authMiddleware, roleMiddleware("administrador"), createDirector);
router.put("/:id", authMiddleware, roleMiddleware("administrador"), updateDirector);
router.delete("/:id", authMiddleware, roleMiddleware("administrador"), deleteDirector);


module.exports = router;
