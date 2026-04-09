import express from "express";
import mongoose from "mongoose";
import Supplier from "./models/Supplier.js";
import Inventory from "./models/Inventory.js";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/inventoryDB");


// POST /supplier
app.post("/supplier", async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// POST /inventory
app.post("/inventory", async (req, res) => {
  try {
    const { supplier_id, product_name, quantity, price } = req.body;

    // validate supplier
    const supplier = await Supplier.findById(supplier_id);
    if (!supplier) {
      return res.status(400).json({ error: "Invalid supplier" });
    }

    const inventory = await Inventory.create({
      supplier_id,
      product_name,
      quantity,
      price
    });

    res.json(inventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// GET /inventory
app.get("/inventory", async (req, res) => {
  const data = await Inventory.find().populate("supplier_id");
  res.json(data);
});


// REQUIRED QUERY
app.get("/inventory/grouped", async (req, res) => {
  const result = await Inventory.aggregate([
    {
      $lookup: {
        from: "suppliers",
        localField: "supplier_id",
        foreignField: "_id",
        as: "supplier"
      }
    },
    { $unwind: "$supplier" },
    {
      $group: {
        _id: "$supplier._id",
        supplierName: { $first: "$supplier.name" },
        city: { $first: "$supplier.city" },
        items: {
          $push: {
            product_name: "$product_name",
            quantity: "$quantity",
            price: "$price"
          }
        },
        totalValue: {
          $sum: { $multiply: ["$quantity", "$price"] }
        }
      }
    },
    { $sort: { totalValue: -1 } }
  ]);

  res.json(result);
});

app.listen(5000, () => console.log("Server running"));