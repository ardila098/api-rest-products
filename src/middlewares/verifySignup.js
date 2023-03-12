
//este da una validacion
//verificamos si existe un rol o no
//con este podemos verificar si me esta enviando un correo nuevo o si ya existe


import { ROLES } from "../models/Role"
import User from "../models/User"


//esta funcion es para verificar si un usuario esta repetido si un email o un username

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    
    //vamos a buscar por username y si encuentras algo lo guardamos en una constante user

    const user = await User.findOne({username: req.body.username})

    if (user) return res.status(400).json({ message: ' the user already exists' })
    
    const email = await User.findOne({ email: req.body.email })
    if (email) return res.status(400).json({ message: ' the email already exists' })

    next();
}

export const checkRolesExisted = (req, res, next) => {
    
//verificar si el req.body.roles existe  y recorro el array
    if (req.body.roles) {
         
        //mientras i sea menor que la longitud del arreglo  voy recorriendolos 1 a 1 y por cada recorrido verifico si existen los roles
        for (let i = 0; i <req.body.roles.length; i++){

            // si el arreglo de roles incluye lo que me esta pasando el usuario enviamos un mensaje de que el rol no existe
            if (!ROLES.includes(req.body.roles[i])) {

                console.log(req.body.roles);
                console.log([i])

                return res.status(400).json({ message: `Role ${req.body.roles[i]} "does not Exist"`})
        
                    
            }

        }

     }

    next();

}