import { __dirname } from './path.js';
import express from 'express';
import handlebars from "express-handlebars"
import viewsRouter from "./routes/views.router.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('views engine','handlebars');

app.use('/', viewsRouter);


app.listen(8080,()=>{
console.log('🚀servidor escuchando puerto 8080');
});
