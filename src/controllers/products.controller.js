import Product from "../models/Product";
import sharp from "sharp";
import fs from "fs";
import path from "path";

exports.createProduct = async (req, res) => {
  console.log(req.body.imgs);

  console.log("files", req.files);
  // console.log(req.method); // POST, GET, etc
  // console.log(req.path); // endpoint llamado

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

  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    stock: req.body.stock,
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
  //a travez del metodo find me busca todos los productos
  console.log("oeee");
  const products = await Product.find();
  res.json(products);
  console.log("oeee");
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  res.status(200).json(product);
};

export const updateProductById = async (req, res) => {
  console.log(req.body);
  console.log("files", req.files);

  const imgs = [];

  for (const file of req.files) {
    const url = file.path.replace(/\\/g, "/");
    try {
     
      const sharpenedBuffer = await sharp(file.path).sharpen().toBuffer();
      const sharpenedUrl = `${file.filename}`;
      const savePath = path.join(__dirname, "path", "to", "save", sharpenedUrl);
     
      fs.mkdirSync(path.dirname(savePath), { recursive: true });
   
      await sharp(sharpenedBuffer).toFile(savePath);
      const IMAGE_PATH = "http://localhost:3000/uploads/";
      imgs.push({
        url: IMAGE_PATH + sharpenedUrl,
      });
    } catch (error) {
      console.error("Error processing image:", error);
    }
  }

  const id = req.params.productId; 

  try {
 
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update product properties except imgs
    existingProduct.name = req.body.name;
    existingProduct.price = req.body.price;
    existingProduct.description = req.body.description;
    existingProduct.category = req.body.category;
    existingProduct.stock = req.body.stock;

    // Add new images to existing ones
    existingProduct.imgs = existingProduct.imgs.concat(imgs);

    // Save the updated product
    const savedProduct = await existingProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error updating product" });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    product.imgs.forEach(async (img) => {
      try {
        const filePath = img.url.replace(/^.*[\\\/]/, ""); // extrae nombre de archivo
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
