import Reference from "../../models/modelsProduct/reference";

export const createReference = async (req, res) => {
  const newReference = new Reference({
    name: req.body.name,
  });

  try {
    const saveReference = await newReference.save();
    res.status(201).json(saveReference);
  } catch (error) {
    console.error("Error saving reference:", error);
    res.status(500).json({ error: "Error creating reference" });
  }
};

export const getReferences = async (req, res) => {
  const references = await Reference.find();
  res.json(references);
};

export const updateReference = async (req, res) => {
  const id = req.params.referenceId;
  const newDataReference = { name: req.body.name };

  try {
    const updatedReference = await Reference.findOneAndUpdate(
      id,
      newDataReference,
      {
        new: true,
      }
    );

    if (!updatedReference) {
      return res.status(404).json({ error: "Reference not found" });
    }

    res.json(updatedReference);
  } catch (error) {
    console.error("Error updating reference:", error);
    res.status(500).json({ error: "Error updating reference" });
  }
};
