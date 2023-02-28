import express from "express";
import ProductManager from "./ProductManager";

const app = express();
const manager = new ProductManager ();

app.get("/Saludo", (req, res) => {
    res.send("Bienvenidos a Vixen!");
});

app.get("/users", (req, res) =>{
    const { city } = req.query;

    if (city) {
        res.send(users.filter((u) => u.city === city));
    } else {
        res.send(users);
    }
});

app.get("/users/:id", (req, res) => {
    const { id } = req.params;

    const user = users.find((u) => u.id === id);

    res.send(user);
});

app.listen(8080, () => {
    console.log("Server listening on port 8080")
});