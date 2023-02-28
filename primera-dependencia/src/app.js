import express from "express";
import ProductManager from "./ProductManager";

const app = express();
const manager = new ProductManager ();

app.get("/Saludo", (req, res) => {
    res.send("Bienvenidos a Vixen!");
});

app.get("/products", async (req, res) =>{
    const products = await manager.getProducts();

    const { limit } = req.query;

    if (limit < 5) {
        res.send(products);
    }
});

app.get("/products/:id", async (req, res) => {
    const { id } = req.params;

    const products = await products.find((u) => u.id === id);

    if(!id){
        return res
        .status(404)
        .send({error: `No existe el producto con ese ID ${id}` });
    }

    res.send(products);
});

app.listen(8080, () => {
    console.log("Server listening on port 8080")
});