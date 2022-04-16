import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class Index {
    async Index (req : Request,res : Response) {
        try {
            const todos_os_autores = await prisma.autor.findMany();
            const todos_os_livros = await prisma.livros.findMany();

            const hot_autores = todos_os_autores.filter(value => { return value.autor_like > 3 });
            const hot_livros = todos_os_livros.filter(livros => {return livros.livro_like > 5})


            console.log("livros hot => ", hot_livros);
            console.log("autores hot => ", hot_autores);

            return res.render("pages/index", { hot_autores, hot_livros });
        }
        catch (error) {
            console.log(error.message);
        }
    }
}