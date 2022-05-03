import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Noticeboard API is running' });
});

const port: string = process.env.PORT || '3330';
app.listen(port, () => console.log('Server running'));