import "reflect-metadata";
import "dotenv/config";

import App from "./app";
import "./resources/clients/client.controller";

console.clear();

export async function bootstrap(): Promise<void> {
  const app: App = new App();

  await app.setup();
}

bootstrap().then(() => console.log("App bootstrap")).catch(console.error);
