import "dotenv/config"; // para cargar variables de entorno si usas .env
import bcrypt from "bcryptjs";
import models from "../src/models";
import dbConnect from "../src/config/mongo"; // ajusta la ruta según tu proyecto

const crearUsuario = async () => {
  await dbConnect(); // conecta a la base de datos
  const hashedPassword = await bcrypt.hash("123456789", 10);

  const usuarioExistente = await models.users.findOne({ mail: "admin@optica.com" });
  if (usuarioExistente) {
    console.log("Ya existe un usuario con ese correo.");
    return;
  }

  await models.users.create({
    mail: "admin@optica.com",
    password: hashedPassword,
  });

  console.log("✅ Usuario admin creado con éxito");
};

crearUsuario();