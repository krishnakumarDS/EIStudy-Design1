import { TextFormatterApp } from "./app";

const app = new TextFormatterApp();
app.run().catch((error) => {
  console.error("Application crashed:", error);
  process.exit(1);
});
