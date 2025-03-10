import express = require("express");
import 'reflect-metadata';
import { connectDB } from "./infrastructure/database/config/database";
import { container } from "./infrastructure/inversify/inversify.config";
import { TYPES } from "./infrastructure/inversify/inversify.types";
import { ILogController } from "./domain/controller/ILogController";

const app = express();
app.use(express.json());

const logController = container.get<ILogController<express.Router>>(TYPES.LogController);

app.use('/api/logs', logController.registerRoutes());

const PORT = 3001;

app.listen(PORT, async () =>  {
    await connectDB();
    console.log(`Server running at http://localhost:${PORT}`)
});