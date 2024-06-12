import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';


const app = express();

const PORT = Number(process.env.SERVER_PORT) || 8080;
console.log({ PORT })

app.get('health', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ health: 'OK' })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
