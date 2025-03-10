import { ILog } from "../entities/ILog"

export interface ILogService {
    logMessage(log: ILog): Promise<void>
    getLogs(filters: Partial<ILog>): Promise<ILog[]>
}