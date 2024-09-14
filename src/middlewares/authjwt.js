//voy a importar el jsonwebtoken para acceder a los metodos

import jwt from "jsonwebtoken";

// desde config voy a traer el archivo secret

import config from "../config";

import User from "../models/User";

import Role from "../models/Role";

//este da la autorizacion
// este es que va a validar si al final es un moderador , es un admin , es un user

//voy a crear una funcion que se encarga de verificar si estoy enviando un token


export const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization'];

  console.log('token' ,token)

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  try {
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};



export const isModerator = async (req, res, next) => {


  const user = await User.findById(req.userId);

 
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
