import "dotenv/config";
import express, { Response } from "express";
import cors from "cors";
import db from "./config/mongo";
import routerApi from "./routes";


const PORT = process.env.PORT || "3000";
const app = express();

app.use(cors());
app.use(express.json());
routerApi(app); // Ejecuta la función routerApi pasando la app como parámetro

app.get("/", (_req, res: Response) => {
   res.send("Api Optica");
});

db().then(() => console.log("Conexion Ready"));

app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));

export default app;