import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function main(){

    //Crear un registro
    const post = await prisma.user.create({
        data:{
            nombre: "Jonathan",
            apellido: "Varas",
            edad: 31,
            correo: "jonathanvaras24@gmail.com",
            password: "1234"
        }
    })
    console.log(post)
}


main()
    .catch((e)=>{
        throw e
    })
    .finally(async () =>{
        await prisma.$disconnect()
    })