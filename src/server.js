import {Server} from "socket.io"
import { __dirname } from './path.js';
import express from 'express';
import handlebars from 'express-handlebars';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.get('/',(req, res)=>{
    res.render("websockets")
})
const httpServer = app.listen(8080, ()=>{
    console.log('🚀 Server listening on port 8080 - desafiowebsocket');
});


const socketServer = new Server(httpServer);
const arrayProds = [];

socketServer.on("connection",(socket)=>{
    console.log("usuario conectado!", socket.id)

    socket.on("newProduct", (objeto)=>{
        arrayProds.push(objeto);
        socketServer.emit("arrayProducts", arrayProds);
    })

    socket.on("deleteProduct", (productId)=>{
        const index = arrayprods.findIndex((product)=>product.id === productId);
        if (index !== -1){
            arrayProds.splice(index, 1);
            socketServer.emit("arrayProducts",arrayProds)
            console.log("array actualizado");
        }
    })
})