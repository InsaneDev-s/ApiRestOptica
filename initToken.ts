import mongoose from "mongoose";
import dotenv from "dotenv";
import TokenModel from "./src/models/tokenModel";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI) throw new Error("Falta la variable MONGO_URI en .env");

const FIRST_REFRESH_TOKEN = process.env.FIRST_REFRESH_TOKEN;

if (!FIRST_REFRESH_TOKEN) throw new Error("Falta FIRST_REFRESH_TOKEN en .env");

const init = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado a MongoDB");

    // Guardar token inicial
    const token = await TokenModel.findOneAndUpdate(
      { name: "google_refresh_token" },
      { value: FIRST_REFRESH_TOKEN },
      { upsert: true, new: true }
    );

    console.log("Refresh token inicial guardado en DB:", token.value);

    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  } catch (err) {
    console.error("Error inicializando token:", err);
  }
};

init();
