const Recipe = require("./queries")

const getRecipeALL = async (req, res) => {
  try {
    const recipes = await Recipe.findAll()
    res.json(recipes)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
}

const CreateRecipe = async (req, res) => {
  try {
    const Recipes = await Recipe.create(req.body)

    res.status(201).json(Recipes)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
}

const FindRecipeById = async (req, res) => {
  const { id } = req.params
  try {
    const Recipes = await Recipe.findByPk(id)
    if (!Recipes) {
      res.status(404).json({ error: "Recipes not found" })
    } else {
      res.json(Recipes)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
}

const UpdateRecipeById = async (req, res) => {
  const { id } = req.params

  try {
    const Recipes = await Recipe.findByPk(id)
    if (!Recipes) {
      res.status(404).json({ error: "Recipes not found" })
    } else {
      const newRecipe = await Recipe.update(id, req.body)
      res.json(newRecipe)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
}

const DeteteRecipeById = async (req, res) => {
  const { id } = req.params
  try {
    const Recipes = await Recipe.findByPk(id)
    if (!Recipes) {
      res.status(404).json({ error: "Recipes not found" })
    } else {
      await Recipe.destroy(id)
      res.status(204).json({ message: "successfully Deleted" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
}

module.exports = {
  getRecipeALL,
  FindRecipeById,
  UpdateRecipeById,
  DeteteRecipeById,
  CreateRecipe,
}
