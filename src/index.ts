import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Noticeboard API is running' });
});

app.listen(3330, () => console.log('Server running'));