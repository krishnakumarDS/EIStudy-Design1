import { MediaPlayerApp } from "./app";

const app = new MediaPlayerApp();
app.run().catch((error) => {
  console.error("Application crashed:", error);
  process.exit(1);
});
