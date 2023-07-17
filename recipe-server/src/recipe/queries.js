const pool = require("../../database")

const Recipe = {
  async findAll() {
    const query = "SELECT * FROM recipes"
    const result = await pool.query(query)
    return result.rows
  },

  async findByPk(id) {
    const query = "SELECT * FROM recipes WHERE id = $1"
    const result = await pool.query(query, [id])
    return result.rows[0]
  },

  async create(recipe) {
    const { title, category, description, ingredients } = recipe
    const query =
      "INSERT INTO recipes (title, category, description, ingredients) VALUES ($1, $2, $3, $4) RETURNING *"
    const values = [title, category, description, ingredients]
    const result = await pool.query(query, values)
    return result.rows[0]
  },

  async update(id, recipe) {
    const { title, category, description, ingredients } = recipe
    const query =
      "UPDATE recipes SET title = $1, category = $2, description = $3, ingredients = $4 WHERE id = $5 RETURNING *"
    const values = [title, category, description, ingredients, id]
    const result = await pool.query(query, values)
    return result.rows[0]
  },

  async destroy(id) {
    const query = "DELETE FROM recipes WHERE id = $1"
    await pool.query(query, [id])
  },
}

module.exports = Recipe
