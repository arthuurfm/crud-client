import express from 'express';
import GameController from '../controllers/gameController.js';

const routes = express.Router();

// todos os jogos cadastrados.
routes.get('/games', GameController.getGames);
routes.post('/games', GameController.registerGame);

export default routes;