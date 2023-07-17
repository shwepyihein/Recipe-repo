const express = require("express")
const swaggerUi = require("swagger-ui-express")
const swaggerJsdoc = require("swagger-jsdoc")
const RecipeRoutes = require("./src/recipe/router")
var cors = require("cors")

const app = express()

app.get("/", (req, res) => {
  res.send("hello world")
})

// Express middlewares
app.use(express.json())
app.use(cors())

// API routes
app.use("/api/v1", RecipeRoutes)

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Recipe API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
  },
  apis: ["./src/recipe/*.js"],
}

const specs = swaggerJsdoc(options)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

// Start the server
const port = process.env.PORT || 8001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
