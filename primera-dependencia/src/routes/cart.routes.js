import express from "express";
import CartManager from "../CartManager.js";

const router = express.Router();
const manager = new CartManager();

router.post("/", async (req, res) =>{
    const cart = await manager.addCart();

    res.send({ data: cart });
});

router.get("/:cid", async (req, res) =>{
    const { cid } = req.params;

    const cart = await manager.getCartById(cid);

    if(!cart){
        return res.status(404).send({ error: `Cart with this ID ${cid} not found`});
    }

    res.send({ data: cart });
});

router.post("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;

    const cart = await manager.addProductToCart(cid,pid);

    res.send({ data: cart });
});

export default router;