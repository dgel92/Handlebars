const socket= io();

    const products = document.getElementById('products_list');
    const form = document.getElementById('productForm');
    
    const inputTitle = document.getElementById('prod_title');
    const inputPrice = document.getElementById('prod_price');
    const inputStock = document.getElementById('prod_stock');
    /*f
    const formDelete = document.getElementById("formDelete");
    const nameDelete = document.getElementById("nameDelete");
    const productDelete = document.getElementById("productDelete")
    */
    socket.on('arrayProducts', (array) => {
        let arrayProducts = '';
        array.forEach(p => {
            arrayProducts += `<li id="product__${p.id}">${p.title} - $${p.price} (${p.stock} unidades.)</li>`;
    })
    products.innerHTML = arrayProducts;
    socket.emit('update', {message: 'Products updated correctly'})
});

socket.on('productsArray', (array) => {
    let productsArray = '';
    array.forEach(p => {
        productsArray += `<li id="product__${p.id}">${p.title} - $${p.price} (${p.stock} unidades.)</li>`;
    })
    products.innerHTML = productsArray;
    socket.emit('message', {message: 'Products recieved correctly'})
})

form.onsubmit = (e) =>{
    e.preventDefault();
    const title = inputTitle.value;
    const desc = 'No description provided.'
    const price = Number(Math.floor(inputPrice.value));
    const stock = Number(Math.floor(inputStock.value));
    const cat = 'none';
    const status = true;
    const code = Math.floor(Math.random()*10000000 + 10000000);
    const obj = {title, desc, price, stock, cat, status, code}
    socket.emit('newProduct', obj);
    socket.on('arrayUpdate', (array) =>{
        let productsArray = '';
        array.forEach(p => {
            productsArray += `<li id="product__${p.id}">${p.title} - $${p.price} (${p.stock} uds.)</li>`;
        })
        products.innerHTML = productsArray;
        socket.emit('update', {message: 'Products updated correctly'})
    })
}

        /*formDelete.onsubmit=(e)=>{
            e.preventDefault();
            const nameDelet = nameDelete.value;
        }

        socket.on("deleteProduct", (productId) => {
            const index = arrayProds.findIndex((product) => product.id === productId);
            if (index !== -1) {
                arrayProds.splice(index, 1);
                socketServer.emit("arrayProducts", arrayProds);
                let newArrayTotal = arrayProds;
                newArrayTotal.forEach(p=>{
                    newArrayTotal += `${p.name} - ${p.price} <br>`
                    });
                productDelete.innerHTML = newArrayTotal    
                })
            }
        });*/

