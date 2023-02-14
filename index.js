const fs = require("fs");
class ProductManager {
    #path;

    constructor (path){
        this.#path = path
    }

    async getProducts() {
        try{
            const products = await fs.promises.readFile(this.#path, "utf-8");

            return JSON.parse(products);
        } catch (e) {
            return [];
        }
    }

    async getProductsById(idProducts){
        const products = await this.getProducts();
        
        return products.find((p) => p.id === idProducts);

    }

    async addProducts(title, description, price, code, stock){
        const product = this.products.find((prod) => prod.code === code);
        if(!product){
        const nuevoProduct = {
            id: this.products.length,
            title,
            description,
            price,
            code,
            stock
        };

        const products = await this.getProducts();

        const getProducts = [...products, nuevoProduct];

        await fs.promises.writeFile(this.#path, JSON.stringify(getProducts));
        }
    }

    async updateProducts(idProducts){
        
    }

    async deleteProducts(idProducts){
        

    }

}



const manager = new ProductManager("./Products.json");

console.log( manager.getProducts());

 manager.addProducts("Thug life", "Remera overzise blanca, bordada con hilo negro en los bordes", 10000, "A1", 15);
console.log( manager.getProducts());
 manager.addProducts("Angel", "Remera overzise negra", 9000, "A2", 8);
console.log( manager.getProducts());
 manager.getProductsById(0);
console.log( manager.getProducts());


