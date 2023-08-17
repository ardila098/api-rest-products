import Product from "../models/Product";
import sharp from "sharp";
import fs from "fs";
import path from "path";

exports.createProduct = async (req, res) => {
  console.log(req.body);

  console.log(req.method); // POST, GET, etc
  console.log(req.path); // endpoint llamado

  const imgs = [];

  // Loop through uploaded files
  for (const file of req.files) {
    const url = file.path.replace(/\\/g, "/");

    try {
      // Apply sharpening using sharp library
      const sharpenedBuffer = await sharp(file.path).sharpen().toBuffer();

      const sharpenedUrl = `${file.filename}`;
      const savePath = path.join(__dirname, "path", "to", "save", sharpenedUrl);

      // Create the directory if it doesn't exist
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
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
    }
  );

  console.log(updateProductById);
  res.status(200).json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
  console.log(req.params);
  try {
    const product = await Product.findById(req.params.productId);

    // Eliminar las imágenes
    product.imgs.forEach((img) => {
      const filePath = img.url.replace(/^.*[\\\/]/, ""); // extraer nombre de archivo
      fs.unlinkSync(`uploads/${filePath}`); // eliminar archivo
    });

    await product.remove();
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
