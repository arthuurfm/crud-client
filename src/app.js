import express from 'express';
import dbConnect from './config/dbConnect.js';
import routes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';

const connection = await dbConnect();
// se houver algum erro, dispara o erro.
connection.on('error', (error) => {
  console.error('Connection error:', error);
});

// se tudo certo, se conecta com db.
connection.once('open', () => {
  console.log('Database connection successfully.');
});

const app = express();
routes(app);

// middleware de erro.
app.use(errorHandler);

export default app;