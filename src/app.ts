import express from 'express';
import bodyParser from 'body-parser';
import errorHandler from './middlewares/errorHandler'; 
import router from './routes/authRoutes'; 
import protectedRouter from './routes/protectedRoute';

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());

app.use('/api', router);
app.use('/api', protectedRouter);

app.get('/', (req, res) => {
  res.send({Message:'Welcome to Restaurant'});
});

app.use(errorHandler);

export default app;