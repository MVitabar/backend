const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const Product = require("./models/product");
const productsRouter = require("./routes/products");

const app = express();

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// URI de conexión a MongoDB
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://vitabarmartin:Ty31LxBWtXtgcNlY@crm.x0gys.mongodb.net/?retryWrites=true&w=majority&appName=crm";

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Modelo de Producto
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
});

// Ruta para obtener todos los productos (GET /api/products)
app.get("/api/products", (req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Ruta para agregar un nuevo producto (POST /api/products)
app.post("/api/products", (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    originalPrice: req.body.originalPrice,
    currentPrice: req.body.currentPrice,
    discount: req.body.discount,
    category: req.body.category,
    images: req.body.images,
    freeShipping: req.body.freeShipping,
  });

  newProduct
    .save()
    .then(() => res.json("Product added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Ruta para eliminar un producto (DELETE /api/products/:id)
app.delete("/api/products/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        return res.status(404).json("Product not found");
      }
      res.json("Product deleted");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Usar el router para las rutas de productos
app.use("/api/products", productsRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
