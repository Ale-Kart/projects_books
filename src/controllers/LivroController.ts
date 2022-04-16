import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class Livro {
    async TodosOsLivros(req: Request, res: Response) {
        try {
            const todosOsLivros = await prisma.livros.findMany({
                include: {
                    autor: {
                        select: {
                            autor_nome: true
                        }
                    }
                }
            });
            // console.log(todosOsLivros);

            return res.render("pages/livros/L_index.ejs", { todosOsLivros });
        }
        catch (er) {
            console.log(er.message);
        }
    };

    async SobreLivro(req: Request, res: Response) {
        try {
            const { livroid } = req.params;
            const nomeDoAutor = await prisma.livros.findFirst({
                where : {
                    livro_id : livroid
                },
                include : {
                    autor : {
                        select : {
                            autor_nome : true,
                            autor_email: true
                        }
                    }
                }
            });
            const sobreOLivro = await prisma.livros.findFirst({
                where : {
                    livro_id : livroid
                }
            });
            console.log("livro escolhido => ", nomeDoAutor);
            
            return res.render("pages/livros/L_sobreLivro", { sobreOLivro, nomeDoAutor })
        }
        catch (er) {
            console.log(er.message);
            
        }
    };

    async CriarLivro (req: Request, res: Response) {
        const { txtNomeLivro, txtDescriptionLivro, txtSelectNameAutor } = req.body;
        const adicionar_livro = await prisma.livros.create({
            data : {
                livro_title : txtNomeLivro,
                livro_description : txtDescriptionLivro,
                autor : {
                    connect : {
                        autor_id : txtSelectNameAutor
                    }
                }
            }
        });
        console.log("aki o select => ",txtSelectNameAutor);
        return res.redirect("/");
    };

    async LivroLike (req: Request, res: Response) {
        try {
            const livro_prop = await prisma.livros.findFirst({
                where : {
                    livro_id : req.params.id
                }
            });
            if (livro_prop) {
                const likes_livro = await prisma.livros.update({
                    where : {
                        livro_id : req.params.id
                    },
                    data: {
                        livro_like: livro_prop.livro_like + 1
                    }
                })
                // autor_prop.autor_like = autor_prop.autor_like;
                res.json({likes : livro_prop.livro_like });
                console.log(likes_livro);
            }
            
        }
        catch (error) {
            console.log(error.message);
        }
    };

    async RemoverLivro (req: Request, res: Response) {
        try {
            const { id } = req.params;
            const remover_livro = await prisma.livros.delete({
                where: {
                    livro_id : id
                }
            });

            return res.redirect("/");
        }
        catch (error) {
            console.log(error.message);   
        }
    };
};