import { setupServer } from "msw/node";
import { awesomeHandler, awesomeIdHandlers } from "./handlers";

const handlers = [awesomeHandler, ...awesomeIdHandlers];

const server = setupServer(...handlers);

process.once("SIGINT", () => server.close());
process.once("SIGTERM", () => server.close());

export const mockServer = server;
