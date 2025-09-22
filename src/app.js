import express from 'express';
import dbConnect from './config/dbConnect.js';
import routes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';
import error404Handler from './middlewares/error404Handler.js';

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

// middleware de erro 404.
app.use(error404Handler)

// middleware de erros.
app.use(errorHandler);

export default app;