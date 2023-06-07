import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";

const localtunnel = require("localtunnel");

const app = Fastify();

app.register(cors, {
  origin: true,
});

app.register(appRoutes);

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(async (url) => {
    const tunnel = await localtunnel({
      local_host: "0.0.0.0",
      port: 3333,
      subdomain: "hucvfhu-api",
    });

    console.log("HTTP Server Running on port 3333");
  });
