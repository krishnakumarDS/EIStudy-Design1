import { ConfigManagerApp } from "./app";

const app = new ConfigManagerApp();
app.run().catch((error) => {
  console.error("Application crashed:", error);
  process.exit(1);
});
