const express = require("express")
const router = express.Router()
const controller = require("./controller")

/**
 * @swagger
 * /api/v1/recipes:
 *   get:
 *     summary: Retrieve a list of Recipess
 *     responses:
 *       200:
 *         description: A list of Recipess
 */
router.get("/recipes", controller.getRecipeALL)

/**
 * @swagger
 * /api/v1/recipes/{id}:
 *   get:
 *     summary: Retrieve a single Recipes by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the Recipes
 *     responses:
 *       200:
 *         description: A Recipes object
 *       404:
 *         description: Recipes not found
 */
router.get("/recipes/:id", controller.FindRecipeById)

/**
 * @swagger
 * /api/v1/recipes:
 *   post:
 *     summary: Create a new Recipes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: number
 *               category:
 *                 type: string
 *               ingredients:
 *                type: array
 *                items:
 *                 type: string
 *                 example: Ingredient 1
 *     responses:
 *       201:
 *         description: Recipes created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/recipes", controller.CreateRecipe)

/**
 * @swagger
 * /api/v1/recipes/{id}:
 *   put:
 *     summary: Update an existing Recipes by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the Recipes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: number
 *               category:
 *                 type: string
 *               ingredients:
 *                type: array
 *                items:
 *                 type: string
 *                 example: Ingredient 1
 *     responses:
 *       200:
 *         description: Recipes updated successfully
 *       404:
 *         description: Recipes not found
 *       400:
 *         description: Invalid request body
 */
router.put("/recipes/:id", controller.UpdateRecipeById)

/**
 * @swagger
 * /api/v1/recipes/{id}:
 *   delete:
 *     summary: Delete a Recipes by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the Recipes
 *     responses:
 *       204:
 *         description: Recipes deleted successfully
 *       404:
 *         description: Recipes not found
 */
router.delete("/recipes/:id", controller.DeteteRecipeById)

module.exports = router
