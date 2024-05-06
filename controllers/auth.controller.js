import db from "../database/db.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { generateToken, generateRefreshToken } from "../utils/tokenManager.js";
import { response } from "express";

export const register = async(req, res) =>{        
    const { nombre, apellido, edad, correo, password } = req.body;
    try {        
        const findUser = await db.user.findUnique({
            where:{
                correo: correo
            }
        })

        if (findUser) throw { code: 11000};


        const salt = await bcryptjs.genSalt(8);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const user = await db.user.create({
            data:{
                nombre: nombre,
                apellido: apellido,
                edad: edad,
                correo: correo,
                password: hashedPassword
            }        
        })

        return res.json({ok: true})



    } catch (error) {                
        await db.$disconnect();

        if(error.code === 11000){
            return res.status(400).json({error: 'Ya existe un Usuario registrado con este correo'});
        }

        throw error
    }
    finally{
        await db.$disconnect();
    }
}

export const login = async (req, res) =>{

    const { correo, password } = req.body;

    try {
        const user = await db.user.findUnique({
            where:{
                correo: correo
            }
        });
        //if(!user) throw { code: 11001};

        if(!user)
            return res.status(403).json({ error: "No existe este usuario "})

        const checkPassword = await bcryptjs.compareSync(password, user.password)        

        // if(!checkPassword) throw {code: 11002}

        if(!checkPassword)
            return res.status(403).json({ error: "Contraseña incorrecta"})

        delete user.password

        // Generar el token JWT     
        
        //const {token, expiresIn} = generateToken(user.id)        
        generateRefreshToken(user.id, res);        
        
        //return "res.json({token, expiresIn})";
        return res.json({message: "Logueado con éxito"});



    } catch (error) {
        await db.$disconnect() 
        return res.status(500).json({ error: "Error de servidor"})
    }
    finally{
        await db.$disconnect()
    }
}


export const infoUser = async (req, res) =>{
    try {
        const user = await db.user.findFirst({
            where:{
                id: req.uid
            }
        });
        res.json({nombre: user.nombre,correo: user.correo})
    } catch (error) {
        
        db.$disconnect()
        return res.status(500).json({error: 'Error de server'})
    }
}

export const refreshToken = (req, res) => {
    
    try {
        const refreshTokenCookie = req.cookies.refreshToken;        
        
        if(!refreshTokenCookie) throw new Error("No existe el token")

        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH)
        
        const {token, expiresIn} = generateToken(uid)

        return res.json({ token , expiresIn })


    } catch (error) {
        const TokenVerificationErrors = {
            "invalid signature": "La firma del JWT no es válida",
            "jwt expired": "JWT expirado",
            "invalid token": "Token no válido",
            "No Bearer": "Utiliza formato Bearer",
            "jwt malformed": "JWT formato no valido"
        };

        return res
                .status(401)
                .send({ error: TokenVerificationErrors[error.message]})
    }
}

export const logout = (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ok: true});
}