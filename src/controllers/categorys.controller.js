import Category from "../models/modelsProduct/Categorys";

export const createCategory = async (req, res) => {
  const newCategory = new Category({
    name: req.body.name,
  });

  try {
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error saving category:", error);
    res.status(500).json({ error: "Error creating category" });
  }
};

export const getCategorys = async (req, res) => {
  const categorys = await Category.find();
  res.json(categorys);
};

export const getCategoryById = async (req, res) => {
  const category = await Category.findById(req.params.categoryId);
  res.status(200).json(category);
};

export const updateCategoryById = async (req, res) => {
  console.log(req.body);
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    console.log(category);

    
    await category.remove();
    res.json({ message: "category deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
