import User from "../models/User";
import jwt from "jsonwebtoken";

import config from "../config";
import Role from "../models/Role";
import { verifyToken } from "../middlewares/authjwt";

export const signup = async (req, res) => {
  //desde req. body yo voy a esperar que el usuario me envie los datos

  const { username, email, password, roles } = req.body;

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  //si el usuario se registra con un rol , el va a buscar en la base de datos si existe ese rol y me va a devolver una constate foundroles
  // si el usuario se registra con un rol , este me devuelve la id del rol que uso
  // si el usuario se registra sin un rol , el va a crear el rol de user por defecto
  if (roles) {
    const foundRole = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRole.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  // el usuario registrado me queda guradado en la const saveUser
  const savedUser = await newUser.save();
  console.log(savedUser);

  //con jwt genero el token
  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400, // 24h
  });

  res.status(200).json({ token });
};
export const signin = async (req, res) => {
  // Buscar el usuario por email
  const userFound = await User.findOne({ email: req.body.email }).populate(
    "roles"
  );
  if (!userFound) return res.status(400).json({ message: "User not found" });

  // Verificar la contraseña
  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );
  if (!matchPassword)
    return res.status(401).json({ token: null, message: "Invalid password" });

  // Generar el token
  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400, // 24 horas
  });

  // Establecer el token en las cookies
  res.cookie("token", token, {
    httpOnly: true, // Accesible solo desde el servidor
    sameSite: 'None',
    secure: false, // Solo usar en HTTPS en producción
    maxAge: 86400 * 1000, // 24 horas
  });
 

  // Enviar respuesta
  res.json({ token });
};



export const verifySession = async (req, res) => {
  const { token } = req.body;

  console.log(token)

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, config.SECRET);

    // Buscar al usuario y poblar los roles
    const user = await User.findById(decoded.id).populate("roles");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Devolver la información del usuario
    res.json({
      message: "Session is valid",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles.map((role) => role.name),
      },
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      // Error específico para tokens inválidos
      return res.status(401).json({ message: "Invalid token" });
    }
    // Otros errores (por ejemplo, problemas de base de datos)
    console.error("Error verifying session:", error);
    res.status(500).json({ message: "Error verifying session" });
  }
};