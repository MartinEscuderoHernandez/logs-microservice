import { Container } from "inversify";
import { MongoLogRepository } from "../repositories/MongoLogRepository";
import { LogService } from "../services/LogService";
import { LogController } from "../http/LogController";
import { TYPES } from "./inversify.types";
import { ILogRepository } from "../../domain/repositories/ILogRepository";
import { ILogService } from "../../domain/services/ILogService";
import { ILogController } from "../../domain/controller/ILogController";
import { Router } from "express";
import { ILogMessageUseCase } from "../../domain/use-cases/ILogMessageUseCase";
import { LogMessageUseCase } from "../../application/usecases/LogMessageUseCase";
import { IGetLogsUseCase } from "../../domain/use-cases/IGetLogsUseCase";
import { GetLogsUseCase } from "../../application/usecases/GetLogsUseCase";

const container = new Container();

container.bind<ILogRepository>(TYPES.MongoLogRepository).to(MongoLogRepository);
container.bind<ILogService>(TYPES.LogService).to(LogService);
container.bind<ILogController<Router>>(TYPES.LogController).to(LogController);
container.bind<ILogMessageUseCase>(TYPES.LogMessageUseCase).toDynamicValue(() => {
    const logService = container.get<ILogService>(TYPES.LogService);
    return new LogMessageUseCase(logService);
});
container.bind<IGetLogsUseCase>(TYPES.GetLogsUseCase).toDynamicValue(() => {
    const logService = container.get<ILogService>(TYPES.LogService);
    return new GetLogsUseCase(logService);
});

export { container }