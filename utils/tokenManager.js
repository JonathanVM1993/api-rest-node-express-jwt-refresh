import jwt from "jsonwebtoken"

export const generateToken = (uid) => {
    
    const expiresIn = 60 * 15;

    try {
        const token = jwt.sign({uid},process.env.JWT_SECRET,{expiresIn})

        return {token, expiresIn}
        
    } catch (error) {
        console.log(error);
    }
}

export const generateRefreshToken = (uid, res) =>{    
    
    const expiresIn = 60 * 60 * 24 * 30;

    try {
        const refreshToken = jwt.sign({uid}, process.env.JWT_REFRESH, {expiresIn})
        
        res.cookie("refreshToken", refreshToken,{
            httpOnly: true, // Para que la cookie solo pueda ser accedida en el intercambio con el navegador
            secure: !(process.env.NODE_ENV === 'dev'), // Para que viva solo en https se pone true. Estamos preguntando en que modo estamos, como estamos en developer esto daría false
            expires: new Date(Date.now() + expiresIn * 1000) // Multiplicarlo por 1000 por que está en milisegundos.
        }); // Con estas opciones no se puede acceder desde el frontend con javascript
        

    } catch (error) {
        console.log(error)
    }

}