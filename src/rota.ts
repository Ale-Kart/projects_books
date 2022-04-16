import { PrismaClient } from '@prisma/client';
import {Router, Request, Response} from 'express';
import { Autor } from './controllers/AutorController';
import { Index } from './controllers/IndexController';
import { Livro } from './controllers/LivroController';
import { Search } from './controllers/SearchController';

const prisma = new PrismaClient();
const rota = Router();

const autor = new Autor;
const livro = new Livro;
const index = new Index;
const search_class = new Search;

rota.get("/", index.Index);


//  Rota Gerenciar ==>
rota.get("/Autores", autor.TodosOsAutores);

rota.get("/Autores/sobre/:autorid", autor.SobreOAutor);

rota.get("/Autores/criarAutor" , (req:Request,res:Response) => { res.render("pages/novoAutor") });

rota.post("/Autores/autor_criado", autor.CriarAutor);

rota.post("/comentario/adicionar/:id", autor.ComentariosAutor);
// rota.get("/Autores/removerAutor/:id", autor.RemoverAutor);
// Rota Gerenciar <==


//  Rota Livro ==>
rota.get("/livros", livro.TodosOsLivros);

rota.get("/livros/about/:livroid", livro.SobreLivro);

rota.get("/livros/novoLivro", async (req:Request,res:Response) => {
    try {
        const nomesAutores = await prisma.autor.findMany({
            select : {
                autor_nome : true,
                autor_id : true
            }
        });
        console.log(nomesAutores);
        
        res.render("pages/livros/L_novoLivro", { nomesAutores });
    }
    catch (error) {
        console.log("erro na linha 39 => ", error.message);
            
    }
});

rota.get("/livros/removerLivro/:id", livro.RemoverLivro);

rota.post("/livros/livro_criado", livro.CriarLivro);
//  Rota Livro <==

// LIKES =======================================
rota.post("/Autores/:id/like", autor.AutorLike);

rota.post("/livros/:id/like", livro.LivroLike);
// Busca=======================================
rota.get("/Buscar/procurar", search_class.Buscar)



export default rota;