import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class Autor {

    async TodosOsAutores(req: Request, res: Response) {
        try {
            const TodosOsAutores = await prisma.autor.findMany();
            console.log(TodosOsAutores);

            return res.render("pages/gerenciar", { TodosOsAutores });
        }
        catch (error) {
            console.log(error.message);
        }
    };

    async SobreOAutor(req: Request, res: Response) {
        try {
            const { autorid } = req.params;
            const livrosDoAutor = await prisma.livros.findMany( { where : { autor : { autor_id : autorid } } } );
            const dadosDoAutor = await prisma.autor.findFirst( { where: { autor_id: autorid } } );
            const load_comentarios_autor = await prisma.comentarios_Autor.findMany( { where : { autor_id : autorid } } );

            console.log("os livros aki karai => ",dadosDoAutor);
            console.log("carregando comentarios =====>", load_comentarios_autor);
            return res.render("pages/sobreAutor",{ dadosDoAutor, livrosDoAutor, load_comentarios_autor });
        }
        catch (error) {
            console.log(error.message);
        }
    }

    async CriarAutor(req: Request, res: Response) {
        try {
            const { txtNomeAutor, txtEmailAutor, txtDescriptionAutor } = req.body
            const criarAutor = await prisma.autor.create({
                data: {
                    autor_nome : txtNomeAutor,
                    autor_description  : txtDescriptionAutor,
                    autor_email : txtEmailAutor,
                }
            });
            console.log(criarAutor);
            
            return res.redirect("/");
        }
        catch (er) {
            console.log(er.message);
        }
    };

    async AutorLike (req: Request, res: Response) {
        try {
            const autor_prop = await prisma.autor.findFirst({
                where : {
                    autor_id : req.params.id
                }
            });
            if (autor_prop) {
                const likes_autor = await prisma.autor.update({
                    where : {
                        autor_id : req.params.id
                    },
                    data: {
                        autor_like : autor_prop.autor_like + 1
                    }
                })
                // autor_prop.autor_like = autor_prop.autor_like;
                res.json({likes : autor_prop.autor_like });
                console.log(likes_autor);
            }
            
        }
        catch (error) {
            console.log(error.message);
        }
    };

    // async RemoverAutor (req: Request, res: Response) {
    //     try {
    //         const { id } = req.params;
    //         const remover_autor = await prisma.autor.delete( { where: { autor_id : id } } );

    //         console.log(remover_autor);
    //         return res.redirect("/Autores");
    //     }
    //     catch (error) { console.log(error.message) };
    // };

    async ComentariosAutor (req: Request, res: Response) {
        try {
            const comentarios_autor = await prisma.comentarios_Autor.findMany();
        }
        catch (error) {
            console.log(error.message);    
        }
    }
};