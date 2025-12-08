const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Crear usuario
const createUser = async (req, res) => {
  try {
    const { email, password, rol } = req.body;

    if (!email || !password || !rol) {
      return res.status(400).json({ error: "Email, contraseña y rol son obligatorios" });
    }

    const rolesPermitidos = ["administrador", "docente"];
    if (!rolesPermitidos.includes(rol)) {
      return res.status(400).json({ error: "Rol inválido" });
    }

    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const nuevoUsuario = new User({
      email,
      password: passwordHash,
      rol
    });

    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: "Usuario creado con éxito",
      usuario: {
        id: nuevoUsuario._id,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol
      }
    });
  } catch (error) {
    console.error("Error creando usuario:", error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

// Obtener usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        email: usuario.email,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET || "clave_secreta_super_segura",
      { expiresIn: "8h" }
    );

    res.json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        id: usuario._id,
        email: usuario.email,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

// ACTUALIZAR usuario
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, rol } = req.body;

    const rolesPermitidos = ["administrador", "docente"];
    if (rol && !rolesPermitidos.includes(rol)) {
      return res.status(400).json({ error: "Rol inválido" });
    }

    const update = {};
    if (email) update.email = email;
    if (rol) update.rol = rol;

    // si envían password, la encriptamos
    if (password) {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(password, salt);
    }

    const usuarioActualizado = await User.findByIdAndUpdate(id, update, { new: true }).select("-password");

    if (!usuarioActualizado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({
      mensaje: "Usuario actualizado con éxito",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

// ELIMINAR usuario
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminado = await User.findByIdAndDelete(id);
    if (!eliminado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

module.exports = {
  createUser,
  getUsers,
  login,
  updateUser,
  deleteUser
};
