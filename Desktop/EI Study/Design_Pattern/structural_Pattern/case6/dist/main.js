"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const app = new app_1.CoffeeOrderingApp();
app.run().catch((error) => {
    console.error("Application crashed:", error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map