import Product from "../models/Product";
const mongoose = require("mongoose");
import sharp from "sharp";
import fs from "fs";
import path from "path";
import Categorys from "../models/modelsProduct/Categorys";
import reference from "../models/modelsProduct/reference";

exports.createProduct = async (req, res) => {
  console.log(req.body);

  console.log("files", req.files);
  // console.log(req.method); // POST, GET, etc
  // console.log(req.path); // endpoint llamado

  const categoryArray = req.body.category.split(",");
  const categoryIds = categoryArray.map((id) => mongoose.Types.ObjectId(id));
  const imgs = [];

  // Loop through uploaded files
  for (const file of req.files) {
    const url = file.path.replace(/\\/g, "/");

    try {
      // Apply sharpening using sharp library
      const sharpenedBuffer = await sharp(file.path).sharpen().toBuffer();

      const sharpenedUrl = `${file.filename}`;
      const savePath = path.join(__dirname, "path", "to", "save", sharpenedUrl);

      // Crear directorio si no existe
      fs.mkdirSync(path.dirname(savePath), { recursive: true });

      // Save the sharpened image to a new path
      await sharp(sharpenedBuffer).toFile(savePath);

      const IMAGE_PATH = "http://localhost:3000/uploads/";

      imgs.push({
        url: IMAGE_PATH + sharpenedUrl,
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
  try {
    const searchTerm = req.query.search;
    let products;

    if (!searchTerm || searchTerm.trim() === "") {
      products = await Product.find({});
    } else {
      const regex = new RegExp(searchTerm, "i"); 

      const [categoryIds, referenceIds] = await Promise.all([
        Categorys.find({ name: { $regex: regex } }).distinct("_id"),
        reference.find({ name: { $regex: regex } }).distinct("_id"),
      ]);

      products = await Product.find({
        $or: [
          { name: { $regex: regex } },
          { description: { $regex: regex } },
          { category: { $in: categoryIds } },
          { reference: { $in: referenceIds } },
        ],
      });
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
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
      const IMAGE_PATH = "http://localhost:3000/uploads/";
      newImgs.push({
        url: IMAGE_PATH + sharpenedUrl,
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
