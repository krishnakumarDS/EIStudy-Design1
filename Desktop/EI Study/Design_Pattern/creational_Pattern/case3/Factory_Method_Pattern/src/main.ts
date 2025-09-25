import { DocumentCreatorApp } from "./app";

const app = new DocumentCreatorApp();
app.run().catch((error) => {
  console.error("Application crashed:", error);
  process.exit(1);
});
