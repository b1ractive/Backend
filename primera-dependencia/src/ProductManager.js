const fs = require("fs");
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

const manager = new ProductManager("./Products.json");

  await manager.addProducts("Thug life", "Remera overzise blanca, bordada con hilo negro en los bordes", 10000, "sin imagen", "A1", 15);
 console.log( manager.getProducts());
  await manager.addProducts("Burbelly", "Remera gris", 7000, "sin imagen", "A2", 20);
  await manager.addProducts("Angel", "Remera  negra", 9000, "sin imagen", "A3", 8);
  await manager.addProducts("Moschino", "Remera azul", 6000, "sin imagen", "A4", 12);
  await manager.addProducts("Gucci", "Remera  roja", 12000, "sin imagen", "A5", 5);
  await manager.addProducts("Revenge", "Remera beige", 11500, "sin imagen", "A6", 10);
  await manager.addProducts("Lathom", "Remera  Turquesa", 8000, "sin imagen", "A7", 6);
  await manager.addProducts("Jordan", "Remera blanca, con doble estampado", 15000, "sin imagen", "A8", 11);
  await manager.addProducts("Sick", "Remera verde", 7500, "sin imagen", "A9", 7);
  await manager.addProducts("Muun", "Remera oversize amarilla", 6500, "sin imagen", "A10", 4);
  await manager.addProducts("Hilfigher", "Remera marron", 17000, "sin imagen", "A11", 2);

await manager.updateProduct(
    1,
    { 
    title: 'Bambi',
    description: 'Remera overzise gris',
    price: 6500
    }
);
console.log( manager.getProducts());
console.log( await manager.getProductsById(1));
await manager.deleteProduct(1);
console.log( await manager.getProducts());
}
main()

export default ProductManager;