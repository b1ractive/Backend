import fs from "fs";
class CartManager {
    #path;
    #nextId = 0;

    constructor(path) {
        this.#path = path
    }

    async addCart(){
        const carts = await this.getCarts();

        const newCart = {
            id: this.#nextId,
            products: [],
        };

        const updateCarts = [...carts, newCart];

        await fs.promises.writeFile(this.#path, JSON.stringify(updateCarts));

        this.#nextId++;

        return newCart;
    }

    async getCarts() {
        try{
            const carts = await fs.promises.readFile(this.#path, "utf-8");

            return JSON.parse(carts);
        } catch (e) {
            return [];
        }
    }

    async addProductToCart(cartId, productId){
        const carts = await this.getCarts();

        const updateCarts = carts.map((c) => {
            if(c.id === cartId) {
                const existingProduct = c.products.find((p) => p.id === productId);

                if(existingProduct) {
                    const updatedProducts = c.products.map((p) => {
                        if(p.id === productId) {
                            return {
                                ...p,
                                quantity: p.quantity + 1,
                            };
                        }

                        return p;
                    });

                    return {
                        ...c,
                        products: updatedProducts,
                    };
                }

                return {
                    ...c,
                    products: [...c.products, { id: productId, quantity: 1}],
                };
            }

            return c;
        });

        await fs.promises.writeFile(this.path, JSON.stringify(updateCarts));

        return this.getCartById(cartId);
    }
}



export default CartManager;