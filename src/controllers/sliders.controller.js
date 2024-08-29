import Slider from "../models/Slider";
import sharp from "sharp";
import fs from "fs";
import path from "path";

exports.createSlider = async (req, res) => {
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


      imgs.push({
        url: sharpenedUrl,
      });
    } catch (error) {
      console.error("Error processing image:", error);
    }
  }

  console.log(imgs, "cok");

  const newSlider = new Slider({
    name: req.body.name,
    description: req.body.description,
    items: req.body.items?.map((item) => ({
      nameItem: item.nameItem,
      description: item.description,
      category: item.category,
      imgs,
    })),
  });

  try {
    const savedSlider = await newSlider.save();
    res.status(201).json(savedSlider);
  } catch (error) {
    console.error("Error saving slider:", error);
    res.status(500).json({ error: "Error creating slider" });
  }
};

export const getSliders = async (req, res) => {
  //a travez del metodo find me busca todos los slideros
  console.log("oeee");
  const sliders = await Slider.find();
  res.json(sliders);
  console.log("oeee");
};

export const getSliderById = async (req, res) => {
  const slider = await Slider.findById(req.params.sliderId);
  res.status(200).json(slider);
};

export const updateSliderById = async (req, res) => {
  console.log(req.body);

  // const updatedSlider = await Slider.findByIdAndUpdate(
  //   req.params.sliderId,
  //   req.body,
  //   {
  //     new: true,
  //   }
  // );

  // console.log(updateSliderById);
  // res.status(200).json(updatedSlider);
};

export const deleteSlider = async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.sliderId);
    console.log(slider);
    slider?.items?.imgs?.forEach(async (img) => {
      try {
        const filePath = img.url.replace(/^.*[\\\/]/, ""); // extrae nombre de archivo
        fs.unlinkSync(`uploads/${filePath}`); // elimina archivo
      } catch (err) {
        console.error("Error deleting image ", err);
      }
    });

    await slider.remove();
    res.json({ message: "Slider deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
