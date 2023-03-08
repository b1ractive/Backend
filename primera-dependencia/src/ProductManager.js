import fs from "fs";
class ProductManager {
    #path;
    #nextId = 0;

    constructor (path){
        this.#path = path
    }

    async getProductsById(idProducts){
        const products = await this.getProducts();
        
        const findProduct =  products.find((p) => p.id === idProducts);
        
        if (!findProduct) {
            throw new Error(`Product with id ${this.#nextId} not found`);
          }
          return findProduct;
    }

    async addProducts(title, description, price, thumbnail, code, stock){
        
        const products = await this.getProducts();
        
        const existingProduct = products.find((prod) => prod.code === code);
        if(!existingProduct){
            const nuevoProduct = {
                
                id: this.#nextId,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };

            
            const getProducts = [...products, nuevoProduct];

            await fs.promises.writeFile(this.#path, JSON.stringify(getProducts));

            this.#nextId++;

            return nuevoProduct;
        } else 
        { 
            throw new Error(`Product with code ${code} already exists`); 
        }
    }


    async getProducts() {
        try{
            const products = await fs.promises.readFile(this.#path, "utf-8");

            return JSON.parse(products);
        } catch (e) {
            return [];
        }
    }

    

    async updateProduct(idProduct, data) {
        const products = await this.getProducts();
    
        const updatedProducts = products.map((p) => {
          if (p.id === idProduct) {
            return {
              ...p,
              ...data,
              idProduct,
            };
          }
    
          return p;
        });
    
        await fs.promises.writeFile(this.#path, JSON.stringify(updatedProducts));
    }

    async deleteProduct(idProduct) {
        const products = await this.getProducts();
    
        const updatedProducts = products.filter((p) => {
          return p.id !== idProduct;
        });
    
        await fs.promises.writeFile(this.#path, JSON.stringify(updatedProducts));
      }

}


async function main() {
}
main()

export default ProductManager;