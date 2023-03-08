import express from "express";
import ProductManager from "./ProductManager.js";
import productsRouter from "./routes/product.routes.js";
import cartsRouter from "./routes/cart.routes.js";
import __dirname from "./utils.js";

const app = express();
const manager = new ProductManager ("./Products.json");

app.get("/Saludo", (req, res) => {
    res.send("Bienvenidos a Vixen!");
});

app.use(express.static(__dirname + "/../public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get("/products", async (req, res) =>{
    const products = await manager.getProducts();

    const { limit } = req.query;

    if (!limit) {
        res.send(products);
    } else {
       const filterProduct = products.slice(0, parseInt(limit)); 
        res.send(filterProduct);
    }
});

app.get("/products/:id", async (req, res) => {
    const { id } = req.params;

    const products = await manager.getProductsById(parseInt(id));

    if(products.length === 0){
        return res
        .status(404)
        .send({error: `No existe el producto con ese ID ${id}` });
    }

    res.send(products);
});

app.listen(8080, () => {
    console.log("Server listening on port 8080")
});