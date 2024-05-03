import { validationResult } from "express-validator";

export const validationResultExpress = (req,res, next) =>{ // Next -> Nos permite decir siga con el código
    const errors = validationResult(req)

    if(!errors.isEmpty()){ //Pregunta si no está vacío
        return res.status(400).json({errors: errors.array()});
    }

    next()

}