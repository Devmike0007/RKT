const express = require("express");
const router = express.Router();
const { Product, Service, Property } = require("../models");

router.get("/nouveaute", async (req, res) => {
  res.render("pages/nouveaute", { title: "Nouveaute" });
});
router.get("/boutique", async (req, res) => {
  res.render("pages/boutique", { title: "Boutique" });
});
router.get("/humanAide", async (req, res) => {
  res.render("pages/humanAide", { title: "humanAide" });
});
router.get("/", async (req, res) => {
  try {
    const featuredProducts = await Product.findAll({
      where: { available: true },
      limit: 4,
      order: [["createdAt", "DESC"]],
    });

    const services = await Service.findAll({
      where: { available: true },
      limit: 3,
    });

    res.render("pages/home", {
      title: "Accueil",
      featuredProducts,
      services,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("errors/500");
  }
});

router.get("/products", async (req, res) => {
  try {
    const { category } = req.query;
    const where = { available: true };

    if (category) {
      where.category = category;
    }

    const products = await Product.findAll({ where });

    res.render("pages/products/list", {
      title: "Nos produits",
      products,
      currentCategory: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("errors/500");
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).render("errors/404");
    }

    res.render("pages/products/detail", {
      title: product.name,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("errors/500");
  }
});

router.get("/contact", (req, res) => {
  res.render("pages/contact", {
    title: "Contact",
  });
});
router.get("/services", async (req, res) => {
  const services = await Service.findAll({});
  res.render("pages/services/list", {
    title: "Services",
    services,
  });
});
router.get("/properties", async (req, res) => {
  const properties = await Property.findAll({});
  res.render("pages/properties/list", {
    title: "Proprietes",
    properties,
  });
});
module.exports = router;
