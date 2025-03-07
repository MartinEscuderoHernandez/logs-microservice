import express = require("express");
import { Container } from 'inversify';
import { MongoLogRepository } from './infrastructure/database/MongoLogRepository';
import { LogService } from './application/usecases/LogService';
import { LogController } from './infrastructure/http/LogController';
import 'reflect-metadata';
import { connectDB } from "./infrastructure/database/config/database";

const app = express();
app.use(express.json());

const container = new Container();
container.bind('ILogRepository').to(MongoLogRepository);
container.bind(LogService).toSelf();
container.bind(LogController).toSelf();

const logController = container.get(LogController);

app.use('/logs', logController.registerRoutes());

const PORT = 3000;

app.listen(PORT, async () =>  {
    await connectDB();
    console.log(`Server running at http://localhost:${PORT}`)
});