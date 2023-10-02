class ProductManager{
   

    constructor(){
        this.products = [];
    }

    getProducts(){
        return this.products;
    }

    addProduct(title,description,price,thumbnail,code,stock){
        if (!title||!description||!price||!thumbnail||!code||!stock) {
            console.warn("Todos los campos son requeridos")
            return;
             }
             const validCode = this.products.find((p)=> p.code === code)
             if (validCode) {
                console.log(`Ya existe este codigo ${code} de producto`)
                return;
             }else{
                const newProduct = {
                    id: this.products.length + 1,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                }
               
                this.products.push(newProduct)
                console.log(newProduct)
             }

    }

    getProductsbyId(prodid){
        const getId = this.products.find((p)=> p.id == prodid)
        if(!getId){
            console.warn("Product not Found")
            return
        }
        console.log("Producto Buscado:",getId)
    }
}

 const productManager = new ProductManager
//instacia 1er producto
 productManager.addProduct(
    "Taladro Makita",
    "Rotopercutor",
    60000,
    "taladro.jpg",
    23,
    10,
 )

//validacion de no igualdad de atributo code
productManager.addProduct(
    "Amoladora Stanley",
    "disco 2 1/2",
    45000,
    "mola.jpg",
    23,
    10,
 )
 //2do producto de prueba
 productManager.addProduct(
    "Lijadora Orbital",
    "5 velocidades",
    35000,
    "lijadora.jpg",
    301,
    10,
 )

 //Prueba de validacion de campos completos
 productManager.addProduct(
    "Compresor 1/2hp",
    35000,
    10,
 )

 productManager.getProductsbyId(1);
 productManager.getProductsbyId(2);
 //busqueda de producto Id inexistente
 productManager.getProductsbyId(8);   
console.log("Productos agregados",productManager.getProducts() )