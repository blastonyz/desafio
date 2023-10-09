const fs = require('fs')

class ProductManager{
   

    constructor(){
        this.products = [];
        this.path = './productos.txt'
    }

   async getProducts(){
        if(!fs.existsSync(this.path)){
            return console.log('el archivo no se encuentra')
        }else{
            try {                           
                    const listJSON = await fs.promises.readFile(this.path,'utf-8');
                    const list = JSON.parse(listJSON);
                    console.log('Lista de productos:',list);
            }catch (error) {
                console.error(`Ocurrio un error: ${error.message}`)
        }
        }
    }

 async addProduct(title,description,price,thumbnail,code,stock){
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
                console.log('Producto agregado:',newProduct)

                const content = JSON.stringify(this.products,null,'\t')

                try {
                   await fs.promises.writeFile(this.path,content,'utf-8')
                } catch (error) {
                   console.log(`Ha ocurrido un error: ${error.message}`) 
                }

             }

    }

    async getProductsbyId(prodid){

        if(!fs.existsSync(this.path)){
            return console.log('el archivo no se encuentra')
        }else{
            try {                           
                    const listJSON = await fs.promises.readFile(this.path,'utf-8');
                    const list = JSON.parse(listJSON);
                    const getId = list.find((p)=> p.id == prodid)
                    if(!getId){
                        console.warn("Product not Found")
                        return
                    }
                    return console.log("Producto Buscado:",getId)
            }catch (error) {
                console.error(`Ocurrio un error: ${error.message}`)
        }
        }
       
    }

    async updateProduct(prodid,newTitle,newDescription,newPrice,NewThumbnail,newCode,newStock){
        
        if(!fs.existsSync(this.path)){
            return console.log('el archivo no se encuentra')
        }else{
            try {                           
                    const listJSON = await fs.promises.readFile(this.path,'utf-8');
                    const list = JSON.parse(listJSON);
                    const index = list.findIndex((e)=> e.id === prodid);
                    console.log(index)
                       if(index !== -1){
                        const updatedObj = {...this.products[index],title: newTitle ? newTitle: this.products[index].title, description: newDescription ? newDescription : this.products[index].description, price: newPrice ? newPrice: this.products[index].price,thumbnail: NewThumbnail ? NewThumbnail: this.products[index].thumbnail , code: newCode? newCode:this.products[index].code, stock: newStock? newStock:this.products[index].stock};
                        this.products[index] = updatedObj;
                        console.log(this.products)
                        const content = JSON.stringify(this.products,null,'\t')

                         try {
                           await fs.promises.writeFile(this.path,content,'utf-8')
                           return console.log('producto actualizado')
                             } catch (error) {
                            console.log(`No pudo actualizarse el producto: ${error.message}`) 
                             }
                                      }
            
                    }catch (error) {
                        console.error(`Ocurrio un error: ${error.message}`)
                 }
            }
        }
    async deleteProduct(prodid){
            
        if(!fs.existsSync(this.path)){
            return console.log('el archivo no se encuentra')
        }else{
            try {                          
                    const listJSON = await fs.promises.readFile(this.path,'utf-8');
                    const list = JSON.parse(listJSON);
                    const deletedList = list.filter((e)=> e.id !== prodid)
                    console.log(deletedList)
                    const content = JSON.stringify(deletedList,null,'\t')
                    try {
                        await fs.promises.writeFile(this.path,content,'utf-8')
                        return console.log('producto borrado')
                          } catch (error) {
                         console.log(`No se pudo borrar: ${error.message}`) 
                          }
                  
            } catch (error) {
            console.error(`No se pudo borrrar el prducto: ${error.message}`)
                }  
        
            }
    }    

}
 const productManager = new ProductManager
//instacia de productos
 productManager.addProduct(
    "Taladro Makita",
    "Rotopercutor",
    60000,
    "taladro.jpg",
    23,
    10,

 )
 productManager.addProduct(
    "Lijadora Orbital",
    "5 velocidades",
    35000,
    "lijadora.jpg",
    301,
    10,
 )
 productManager.addProduct(
    "Compresor Daewo",
    "1/2hp",
    55000,
    "compresor.jpg",
    375,
    77,
 )
 productManager.getProducts();

 productManager.getProductsbyId(1);


 //updateproduct
//el primer parametro es el id del producto que actualizaremos, mientras que los otros parametros corresponden a los atributos a actualizar

productManager.updateProduct(2,"torno","neumatico","","","","");

//Delete en consola se ve bien,pero rompe el json; agraga el objeto a borrar sin id, si no se ejecuta update product, funciona bien
productManager.deleteProduct(3);




 //validacion de no igualdad de atributo code
/*productManager.addProduct(
    "Amoladora Stanley",
    "disco 2 1/2",
    45000,
    "mola.jpg",
    23,
    10,
 )
 

 //Prueba de validacion de campos completos
 productManager.addProduct(
    "Compresor 1/2hp",
    35000,
    10,
 )

 
 //busqueda de producto Id inexistente
 productManager.getProductsbyId(8);   
console.log("Productos agregados",productManager.getProducts() )*/
