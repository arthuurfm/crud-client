import mongoose from 'mongoose';
import express from 'express';
import dbConnect from './config/dbConnect.js';
import routes from './routes/index.js';

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
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).send({
      status: 400,
      message: 'Incorrectly provided data'
    });
  } else {
    res.status(500).json({
      status: 500,
      message: `Internal server error - ${error.message}`
    });
  }
});

export default app;