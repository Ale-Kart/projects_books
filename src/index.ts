import express from 'express';
import Rota from './rota';
import morgan from 'morgan';

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.set('views', 'views');

app.use(Rota);

app.listen(1234)