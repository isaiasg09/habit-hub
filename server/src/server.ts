import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";

const app = Fastify();

app.register(cors);
app.register(appRoutes);

app
  .listen({
    port: 4343,
  })
  .then(() => {
    console.log("HTTP server está rodando poggers");
  });
