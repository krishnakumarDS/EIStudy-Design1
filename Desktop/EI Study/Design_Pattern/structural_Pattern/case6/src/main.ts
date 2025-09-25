import { CoffeeOrderingApp } from "./app";

const app = new CoffeeOrderingApp();
app.run().catch((error) => {
  console.error("Application crashed:", error);
  process.exit(1);
});
