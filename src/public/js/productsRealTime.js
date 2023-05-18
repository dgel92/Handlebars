const socketClient = io();

    const form = document.getElementById('productForm');
    const inputName = document.getElementById('name');
    const inputPrice = document.getElementById('price');
    const products = document.getElementById('products');


    const formDelete = document.getElementById("formDelete");
    const nameDelete = document.getElementById("nameDelete");
    const productDelete = document.getElementById("productDelete")

    form.onsubmit = (e) => {
        e.preventDefault();
        const name = inputName.value;
        const price = inputPrice.value;
        socketClient.emit('newProduct', { name, price });
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

        socketClient.on('arrayProducts', (array) => {
            console.log(array);
            let infoProducts = '';
            array.forEach(p => {
            infoProducts += `${p.name} - ${p.price} <br>`
        });
        products.innerHTML = infoProducts;
    });
