import ProductManager from "../ProductManager.js";
import express  from "express";

const manager = new ProductManager();
const router = express.Router();

router.get("/", async (req, res) => {
    const products = await manager.getProducts();

    const { limit } = req.query;

    if(limit) {
        return res.send(products.slice(0, Number(limit)));
    }

    res.send({ data: products});
});

router.post("/", async (req, res) => {
    const {
        title,
        description,
        code,
        price,
        status = true,
        stock,
        category,
        thumbnails,
    } = req.body;

    if(!title || !description || !code || !price || !stock || !category || !thumbnails){
        res.status(400).send({ error: "Missing input data for product creating"})
    }

    const newProduct = await manager.addProducts(
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
    );

    res.status(201).send({ data: newProduct });
});

router.get ("/:pid", async (req, res) => {
    const { pid } = req.params;

    const product = await manager.getProductsById(pid);

    if(!product){
        return res.status(404).send({ error: `Product with ID ${pid} not found`});
    }

    res.send({ data: product });
});

router.put("/:pid", async (req, res) => {
    const { pid } = req.params;

    const {
        title,
        description,
        code,
        price,
        status = true,
        stock,
        category,
        thumbnails,
    } = req.body;

    if(
        !title ||
        !description ||
        !code ||
        !price ||
        !status === undefined ||
        !stock ||
        !category ||
        !thumbnails
    ) {
        res.status(400).send({ error: "Missing input data for product creating"})
    }

    await manager.updateProduct(pid, req.body);

    res.send({ data: "ok" });
});

router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;

    await manager.deleteProduct(pid);

    res.send({ data: "ok"});
});

export default router;