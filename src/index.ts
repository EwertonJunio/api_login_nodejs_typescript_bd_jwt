import 'express-async-errors';
import express from 'express';
import { AppDataSource } from './data-source';
import { errorMiddleware } from './middlewares/error';
import routes from './routes';

async function startServer() {
  try {
    await AppDataSource.initialize();

    const app = express();

    app.use(express.json());

    app.use(routes);

    app.use(errorMiddleware);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error initializing the app:', error);
  }
}

startServer();


