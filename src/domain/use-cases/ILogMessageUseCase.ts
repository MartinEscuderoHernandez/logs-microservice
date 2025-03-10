import { ILog } from "../entities/ILog";

export interface ILogMessageUseCase {
    execute(log: ILog): Promise<void>;
}