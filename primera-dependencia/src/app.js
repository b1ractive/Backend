import express from "express";
import productsRouter from "./routes/product.routes.js";
import cartsRouter from "./routes/cart.routes.js";
import __dirname from "./utils.js";

const app = express();
app.use(express.json());

app.get("/Saludo", (req, res) => {
    res.send("Bienvenidos a Vixen!");
});

app.use(express.static(__dirname + "/../public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


app.listen(8080, () => {
    console.log("Server listening on port 8080")
});