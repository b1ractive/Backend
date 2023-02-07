class ProductManager {
    products = [];

    constructor() {}

    getProducts() {
        return this.products;
    }

    getProductsById(idProducts){
        const product = this.products.find((p) => p.id === idProducts);

        if(!product) {
            throw new Error (`Producto con id ${idProducts} no encontrado`);
        }
    }

    addProducts(title, description, price, code, stock){
        const nuevoProduct = {
            id: this.products.length,
            title,
            description,
            price,
            code,
            stock
        };

        this.products = [...this.products, nuevoProduct];

    }

}

const manager = new ProductManager();


manager.addProducts("Thug life", "Remera overzise blanca, bordada con hilo negro en los bordes", 10000, "A1", 15);
console.log(manager.getProducts());
manager.addProducts("Angel", "Remera overzise negra", 9000, "A2", 8);
console.log(manager.getProducts());
manager.getProductsById(0, 1);
console.log(manager.getProducts());