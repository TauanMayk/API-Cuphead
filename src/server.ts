import fastify from "fastify";
import cors from "@fastify/cors";
import { cupheadItems, cupheadWeapons } from "./datas/datas";
import type { DriversParams } from "./interface/interfaceparams";

const server = fastify({ logger: true });

server.register(cors, {
  origin: "*",
  methods: ["GET"],
});

server.get("/cuphead-items", async (request, response) => {
  response.type("application/json").code(200);
  return { cupheadItems };
});

server.get("/cuphead-weapons", async (request, response) => {
  response.type("application/json").code(200);
  return { cupheadWeapons };
});

server.get<{ Params: DriversParams }>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const itens = cupheadItems.find((d) => d.id === id);

    if (!itens) {
      response.type("application/json").code(404);
      return { message: "Driver Not Found" };
    } else {
      response.type("application/json").code(200);
      return { cupheadItems };
    }
  }
);

const port = Number(process.env.PORT);

server.listen({ port });
