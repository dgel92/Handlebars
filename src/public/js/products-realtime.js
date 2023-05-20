const socket= io();

    const products = document.getElementById('products__list');
    const form = document.getElementById('productForm');
    
    const inputTitle = document.getElementById('prod__title');
    const inputPrice = document.getElementById('prod__price');
    const inputStock = document.getElementById('prod__stock');

    /*
    const formDelete = document.getElementById("formDelete");
    const nameDelete = document.getElementById("nameDelete");
    const productDelete = document.getElementById("productDelete")
    */
    socket.on('arrayProducts', (array) => {
        let arrayProducts = '';
        array.forEach(p => {
            arrayProducts += `<li id="product__${p.id}">${p.title} - $${p.price} (${p.stock} uds.)</li>`;
    })
    products.innerHTML = arrayProducts;
    socket.emit('update', {message: 'Products updated correctly'})
});

    form.onsubmit = (e) => {
        e.preventDefault();
        const title = inputTitle.value;
        const price = Number((Math.floor(inputPrice.value)));
        const stock = Number((Math.floor(inputStock.value)));
        const code = Math.floor(Math.random()*1000 + 1000000);

        const obj = {
            title,
            price,
            stock,
            code,
        }
        socket.emit('newProduct', obj);
        socket.on('arrayProductsNew',(array)=>{
            let arrayProducts = '';
            array.forEach(p =>{
                arrayProducts += `<li id="product__${p.id}">${p.title} - $${p.price} (${p.stock})</li>`;
            })
            products.innerHTML = arrayProducts;
            socket.emit('update', {message: 'productos actualizados correctamente'})
        });
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

