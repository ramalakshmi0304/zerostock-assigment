import express from "express";
import cors from "cors";
import { products } from "./data.js";

const app = express();

app.use(cors());

app.get("/search", (req, res) => {
  let { q, category, minPrice, maxPrice } = req.query;

  let results = [...products];

  // Case-insensitive name search
  if (q) {
    results = results.filter(item =>
      item.name.toLowerCase().includes(q.toLowerCase())
    );
  }

  // Category filter
  if (category) {
    results = results.filter(
      item => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Price filters
  if (minPrice) {
    results = results.filter(item => item.price >= Number(minPrice));
  }

  if (maxPrice) {
    results = results.filter(item => item.price <= Number(maxPrice));
  }

  res.json(results);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});