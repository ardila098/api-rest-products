import Product from "../models/Product";
const mongoose = require("mongoose");
import sharp from "sharp";
import fs from "fs";
import path from "path";


exports.createProduct = async (req, res) => {
  const categoryArray = req.body.category.split(",");
  const categoryIds = categoryArray.map((id) => mongoose.Types.ObjectId(id));
  const imgs = [];

  for (const file of req.files) {
    try {
      const sharpenedBuffer = await sharp(file.path).sharpen().toBuffer();
      const sharpenedUrl = `${file.filename}`;
      const savePath = path.join(__dirname, "uploads", sharpenedUrl);

      fs.mkdirSync(path.dirname(savePath), { recursive: true });

      await sharp(sharpenedBuffer).toFile(savePath);

      imgs.push({
        url: sharpenedUrl,  
      });
    } catch (error) {
      console.error("Error processing image:", error);
    }
  }

  const pieces = JSON.parse(req.body.pieces);

  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: categoryIds,
    garmentType: req.body.garmentType,
    stock: req.body.stock,
    reference: req.body.reference,
    pieces: pieces,
    imgs,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ error: "Error creating product" });
  }
};
export const getProducts = async (req, res) => {
  const { search, category, reference, color } = req.query;

  const filters = {}; 

  if (search) {
    filters.$text = { $search: search };
  }

  if (category) {
    filters.category = mongoose.Types.ObjectId(category);
  }

  if (reference) {
    filters.reference = mongoose.Types.ObjectId(reference);
  }

  if (color) {
    filters["pieces.sizes.color"] = color;
  }

  try {
    const products = await Product.find(filters).populate("category reference");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  res.status(200).json(product);
};

export const updateProductById = async (req, res) => {
  const id = req.params.productId;
  const existingProduct = await Product.findById(id);

  const categoryArray = req.body.category.split(",");

  const categoryIds = categoryArray.map((id) => mongoose.Types.ObjectId(id));
  const pieces = JSON.parse(req.body.pieces);

  if (!existingProduct) {
    return res.status(404).json({ error: "Product not found" });
  }

  // Actualizar propiedades del producto
  existingProduct.name = req.body.name;
  existingProduct.price = req.body.price;
  existingProduct.description = req.body.description;
  existingProduct.category = categoryIds;
  existingProduct.stock = req.body.stock;
  existingProduct.garmentType = req.body.garmentType;
  existingProduct.pieces = pieces;
  existingProduct.reference = req.body.reference;

  const newImgs = [];
  for (const file of req.files) {
    const url = file.path.replace(/\\/g, "/");
    try {
      const sharpenedBuffer = await sharp(file.path).sharpen().toBuffer();
      const sharpenedUrl = `${file.filename}`;
      const savePath = path.join(__dirname, "path", "to", "save", sharpenedUrl);
      fs.mkdirSync(path.dirname(savePath), { recursive: true });
      await sharp(sharpenedBuffer).toFile(savePath);
      newImgs.push({
        sharpenedUrl,
      });
    } catch (error) {
      console.error("Error processing image:", error);
    }
  }

  const existingImgs = req.body.existingImgs || [];
  const existingImgsIds = existingProduct.imgs.map((img) => img._id.toString());
  const updatedImgs = existingProduct.imgs.filter((img, index) =>
    existingImgs.includes(existingImgsIds[index])
  );

  existingProduct.imgs = [...updatedImgs, ...newImgs];

  const savedProduct = await existingProduct.save();
  res.status(200).json(savedProduct);
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    product.imgs.forEach(async (img) => {
      try {
        const filePath = img.url.replace(/^.*[\\\/]/, "");
        fs.unlinkSync(`uploads/${filePath}`); // elimina archivo
      } catch (err) {
        console.error("Error deleting image ", err);
      }
    });

    await product.remove();
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
