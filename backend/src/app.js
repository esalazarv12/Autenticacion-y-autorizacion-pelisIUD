const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// Middlewares globales
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}));

// Rutas principales
const generoRoutes = require('./routes/generoRoutes');
app.use('/api/generos', generoRoutes);

const peliculaRoutes = require("./routes/peliculaRoutes");
app.use("/api/peliculas", peliculaRoutes);

const tipoRoutes = require("./routes/tipoRoutes");
app.use("/api/tipos", tipoRoutes);

const directorRoutes = require("./routes/directorRoutes");
app.use("/api/directores", directorRoutes);

const productoraRoutes = require("./routes/productoraRoutes");
app.use("/api/productoras", productoraRoutes);

// RUTAS DE USUARIOS (REGISTRO, LOGIN)
const userRoutes = require("./routes/userRoutes");
app.use("/api/usuarios", userRoutes);

// Eliminado: NO usar este router
// const authRoutes = require("./routes/authRoutes");
// app.use("/api/auth", authRoutes);

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Películas 🎬. Usa /api/peliculas, /api/generos, etc.");
});

// Salud del servidor
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
