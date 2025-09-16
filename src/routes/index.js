import express from 'express';
import games from './gamesRoutes.js';
import developers from './developersRoutes.js';

// middleware do express que gerencia rotas, manipula requisições e respostas.
const routes = (app) => {
  // rota home.
  app.route('/').get((req, res) => res.status(200).send('Home'));

  // rota games.
  app.use(express.json(), games, developers);
};

export default routes;