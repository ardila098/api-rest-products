//voy a importar el jsonwebtoken para acceder a los metodos

import jwt from "jsonwebtoken";

// desde config voy a traer el archivo secret

import config from "../config";

import User from "../models/User";

import Role from "../models/Role";

//este da la autorizacion
// este es que va a validar si al final es un moderador , es un admin , es un user

//voy a crear una funcion que se encarga de verificar si estoy enviando un token


export const verifyToken = async (req, res, next) => {
  console.log(req.cookies); // Asegúrate de que las cookies estén presentes
  try {
    // Obtener el token de las cookies
    const token = req.cookies.token;

    // Comprobar si no hay token en las cookies
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    // Verificar el token y extraer el id del token
    const decoded = jwt.verify(token, config.SECRET);

    req.userId = decoded.id;

    // Buscar el usuario por id
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    // Continuar con la ejecución del código
    next();
  } catch (error) {
    return res.status(401).json({ message: "User not authorized" });
  }
};

// ahora vamos a verificar si es un admin , es un moderador o un usuario normal

//vamos a crear dos funciones para moderator y para admin

//moderator

export const isModerator = async (req, res, next) => {
  //vas a buscar desde User.findbyId y le pasamos el req.User id que es el que me guardo el id del usuario en la autenticacion
  // y ahi obtengo un usuario si existe  y lo guardo en user

  const user = await User.findById(req.userId);

  //de todos los roles busca aquel en el que el id este incluido en user.role
  const roles = await Role.find({ _id: { $in: user.roles } });

  console.log(roles);

  //este bubque va empezar en = y va recorrer hasta la multitud del arreglo de roles y sumara de 1 en 1
  // si el role que estoy recorriendo su nombre es igual a moderator entonces continua
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }
  }
  // si no encuentra el rol correcto , retorna un mensaje

  return res.status(403).json({ message: "Require Moderator Role" });
};

//admin

export const isAdmin = async (req, res, next) => {
  //vas a buscar desde User.findbyId y le pasamos el req.User id que es el que me guardo el id del usuario en la autenticacion
  // y ahi obtengo un usuario si existe  y lo guardo en user

  const user = await User.findById(req.userId);

  //de todos los roles busca aquel en el que el id este incluido en user.role
  const roles = await Role.find({ _id: { $in: user.roles } });

  console.log(roles);

  //este bubque va empezar en = y va recorrer hasta la multitud del arreglo de roles y sumara de 1 en 1
  // si el role que estoy recorriendo su nombre es igual a moderator entonces continua
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }
  // si no encuentra el rol correcto , retorna un mensaje

  return res.status(403).json({ message: "Require admin Role" });
};
