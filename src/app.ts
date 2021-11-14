import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';

import connectDB from './db/connect';
import tasks from './routes/tasks.route';
import routeNotFound from './middlewares/not-found';
import errorHandler from './middlewares/error-handler';

dotenv.config();
const app = express();
const PORT = 3000;

//global middlewares
app.use(helmet());
app.use(express.json());

//route middleware
app.use('/api/v1/tasks', tasks);
app.use(routeNotFound);
app.use(errorHandler);

// start the server
const start = async () => {
  try {
    console.log('Connecting to database ...');
    await connectDB(process.env.MONGO_URI!);
    console.log('Connected to database');
    app.listen(PORT, () =>
      console.log(`Server is now running at http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log('ERROR OCCURED IN STARTING SERVER.', error);
  }
};
start();
