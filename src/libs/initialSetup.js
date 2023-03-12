

// vamos a generar a travez de mongoose unos roles en a base de datos

// estimateDocument , para contar si ya existen documentos

//si el contador es 0 significa que no hay ningun rol , entonces guardame el rol

import Role from '../models/Role';

export const createRoles = async () => {

    try {

        const count = await Role.estimatedDocumentCount()
    

        if (count > 0) return;
       
     //ejecuta todas las promesas al mismo tiempo , y esto me va a devolver un values   
 const values= await Promise.all([


    new Role({ name: 'user' }).save(),
    new Role({ name: 'moderator' }).save(),
    new Role({ name: 'admin'}).save()

])

console.log(values)


    } catch (error) {
        
console.error(error)

    }

}


// la importamos en el inicio de la app