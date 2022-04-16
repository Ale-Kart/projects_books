import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IEventListener {
    nome() : number;
}

export class Search {    

    async Buscar(req: Request, res: Response) {
        try {
            const { index } = req.query;
            // const { procurar } = req.params;

            if (index == "" || index == undefined || index == null) {
                // return res.send("nada");
                return res.write(alert);
            }
            else{
                const todos_livros = await prisma.livros.findMany({
                    where: {
                        OR : [
                            {
                                livro_description :{
                                    contains : index.toString(),
                                } 
                            },
                            {
                                livro_title : {
                                    contains : index.toString(),
                                } 
                            }

                        ]
                        // OR: {
                        //     livro_description: {
                        //         contains: index.toString(),
                        //         endsWith : index.toString()
                        //     },
                        //     livro_title: {
                        //         contains: index.toString(),
                        //         endsWith : index.toString(),
                        //         startsWith : index.toString()
                        //     },
                        // }
                    },
                    select: {
                        livro_id: true,
                        livro_title: true,
                        livro_description: true
                    }
                });


                const todos_autores = await prisma.autor.findMany({
                    where: {
                        OR: [
                            {
                                autor_description : {
                                    contains : index.toString(),
                                }
                            },
                            {
                                autor_email : {
                                    contains : index.toString(),
                                }
                            },
                            {
                                autor_nome : {
                                    contains : index.toString(),
                                }
                            }
                            // autor_nome: {
                            //     contains: index.toString(),
                            //     // endsWith : index.toString(),
                            //     // startsWith : index.toString()
                            // },
                            // autor_description: {
                            //     contains: index.toString(),
                            //     // endsWith : index.toString(),
                            //     // startsWith : index.toString()
                            // },
                            // autor_email: {
                            //     contains: index.toString(),
                            //     // endsWith : index.toString(),
                            //     // startsWith : index.toString()
                            // },
                        ],
                    },
                    select: {
                        autor_description: true, autor_email: true,
                        autor_nome: true, autor_id : true
                    }
                });

                // console.log("===> =>",procurar);
                console.log("===>", index);
                console.log(todos_autores);
                console.log(todos_livros);
                
                // return res.send(JSON.stringify(todos_livros));
                return res.render("pages/busca", { todos_livros, todos_autores });
            }
        }
        catch (error) {
            console.log(error.message);

        }
    }
}
