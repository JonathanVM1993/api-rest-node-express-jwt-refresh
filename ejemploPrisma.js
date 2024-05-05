import {PrismaClient} from "@prisma/client";
import db from "./database/db.js";
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main(){

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash("12345", salt)
    //Crear un registro
    

    const post = await db.user.create({
        data:{
            nombre: "Jonathan",
            apellido: "Varas",
            edad: 31,
            email: "jonathanvaras24@gmail.com",
            password: hashedPassword
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