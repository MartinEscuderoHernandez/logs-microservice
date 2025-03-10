import { Router, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { LogType } from '../../domain/enums/LogType';
import { ILogController } from '../../domain/controller/ILogController';
import { TYPES } from '../inversify/inversify.types';
import { ILogMessageUseCase } from '../../domain/use-cases/ILogMessageUseCase';
import { IGetLogsUseCase } from '../../domain/use-cases/IGetLogsUseCase';

@injectable()
export class LogController implements ILogController<Router> {
  constructor(
    @inject(TYPES.LogMessageUseCase) private readonly logMessageUseCase: ILogMessageUseCase, 
    @inject(TYPES.GetLogsUseCase) private readonly getLogsUseCase: IGetLogsUseCase
  ) {}

  registerRoutes(): Router {
    const router = Router();

    router.post('/', async (req: Request, res: Response) => {
      try {
        console.log(req.body);
        const { service, payload, type, content } = req.body;
        if (!service || !payload ||  !type || !content) {
          res.status(400).json({ error: 'Missing required fields' });
        }
        
        await this.logMessageUseCase.execute({ service, payload, type, content, date: new Date() });
        res.status(200).json({ message: 'Log saved with success' });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    router.get('/', async (req: Request, res: Response) => {
      try {
        const filters = req.query;
        const logs = await this.getLogsUseCase.execute(filters);
        res.status(200).json(logs); 
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    return router;
  }
}