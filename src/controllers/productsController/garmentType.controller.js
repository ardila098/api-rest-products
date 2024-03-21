const GarmentType = require("../../models/modelsProduct/garmentType");

export const createGarmentType = async (req, res) => {
  console.log(req);
  const newGarmentType = new GarmentType({
    name: req.body.name,
    pieces: req.body.pieces,
  });

  try {
    const savedGarmentType = await newGarmentType.save();
    res.status(201).json(savedGarmentType);
  } catch (error) {
    console.error("Error saving garment type:", error);
    res.status(500).json({ error: "Error creating garment type" });
  }
};



export const getGarmenTypes = async (req, res) => {
  const garmentTypes = await GarmentType.find();
  res.json(garmentTypes);
};


export const updateGarmenTypeById = async (req, res) => {
  console.log(req);
  const newGarmentType = new GarmentType({
    name: req.body.name,
    pieces: req.body.pieces,
  });

  try {
    const savedGarmentType = await newGarmentType.save();
    res.status(201).json(savedGarmentType);
  } catch (error) {
    console.error("Error saving garment type:", error);
    res.status(500).json({ error: "Error edit garment type" });
  }
};

export const deleteGarmentType = async (req, res) => {
  try {
    const garmentType = await GarmentType.findById(req.params.garmentTypeId);
    console.log(garmentType);

    await garmentType.remove();
    res.json({ message: "GarmenType deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
