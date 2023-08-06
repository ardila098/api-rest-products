import User from "../models/User";
import jwt from "jsonwebtoken";

import config from "../config";
import Role from "../models/Role";

export const createUser = async (req, res) => {
  //desde req. body yo voy a esperar que el usuario me envie los datos

  const { username, email, password, roles } = req.body;

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
    roles,
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

export const getUsers = async (req, res) => {
  //a travez del metodo find me busca todos los productos

  const users = await User.find();
  res.json(users);
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.status(200).json(user);
};

export const updateUserById = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.userId,
    req.body,
    {
      new: true,
    }
  );

  console.log(updateUserById);
  res.status(200).json(updatedUser);
};

export const deleteUserById = async (req, res) => {
  const { userId } = req.params;
  await User.findByIdAndDelete(userId);
  res.status(204).json();
};
