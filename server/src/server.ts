import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";

const localtunnel = require("localtunnel");

const app = Fastify();

app.register(cors);
app.register(appRoutes);

app
  .listen({
    host: "0.0.0.0",
    port: 3333,
  })
  .then(async () => {
    const tunnel = await localtunnel({
      local_host: "0.0.0.0",
      port: 3333,
      subdomain: "dasmdyucbsy-api",
    });

    console.log("HTTP Server Running!");
  });
