const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const ejs = require("ejs");
// const expressLayouts = require("express-ejs-layouts");

// Import routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const contactRoutes = require("./routes/contactRoutes");
const viewRoutes = require("./routes/viewRoutes");

// Initialize app
const app = express();

// Middleware pour les fichiers statiques (doit être avant les routes)
app.use(express.static(path.join(__dirname, "public")));

// Middleware pour les types MIME
app.use((req, res, next) => {
  if (req.url.endsWith(".css")) {
    res.setHeader("Content-Type", "text/css");
  }
  if (req.url.endsWith(".js")) {
    res.setHeader("Content-Type", "application/javascript");
  }
  next();
});

// Configuration du moteur de template
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware standard
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/", viewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/contact", contactRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("errors/500", {
    title: "Erreur serveur",
  });
});

module.exports = app;
