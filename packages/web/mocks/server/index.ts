import { setupServer } from "msw/node";
import { awesomeHandler } from "./handlers";

const handlers = [awesomeHandler];

const server = setupServer(...handlers);

process.once("SIGINT", () => server.close());
process.once("SIGTERM", () => server.close());

export const mockServer = server;
