export const productValidator = (req, res, next) =>{
    const product = req.body;
    console.log(typeof product.price === 'number');
    if(typeof product.price === 'number' && product.price !== null && product.price !== ''){
        next();
    }else{
        res.status(404).send("el valor del producto no es un numero");
    }
}

export const stockValidator = (req, res, next) =>{
    const product = req.body;
    if(product.stock >= 1){
        next();
    }else{
        res.status(404).send("la cantidad de stock debe ser mayor a cero");
    }
} 