import jwt from 'jsonwebtoken'

export const requireToken = (req, res, next) =>{ // Next es para que siga con el siguiente Middleware
    try {
        let token = req.headers?.authorization; // Obtenemos el token del header authorization
        
        if(!token) throw new Error('No Bearer');
        
        token = token.split(" ")[1];        

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid      
        
        next(); // Si no existe el Next, nunca va a llegar al infoUser en la ruta

    } catch (error) {

        const TokenVerificationErrors = {
            "invalid signature": "La firma del JWT no es válida",
            "jwt expired": "JWT expirado",
            "invalid token": "Token no válido1",
            "No Bearer": "Utiliza formato Bearer23",
            "jwt malformed": "JWT formato no valido"
        };

        return res
                .status(401)
                .send({ error: TokenVerificationErrors[error.message]})
        
    }
}


export const requireTokenRespaldo = (req, res, next) =>{ // Next es para que siga con el siguiente Middleware
    try {
        let token = req.headers?.authorization; // Preguntamos si existe la cabecera authorization. Si no, lanzamos un error de No Bearer
        
        if(!token) throw new Error('No Bearer');


        token = token.split(" ")[1];
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid      
        
        next(); // Si no existe el Next, nunca va a llegar al infoUser en la ruta

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