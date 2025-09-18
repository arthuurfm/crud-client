import express from 'express';
import GameController from '../controllers/gameController.js';

const routes = express.Router();

routes.get('/games', GameController.getGames);
routes.get('/games/search', GameController.getGamesByTitle);
routes.get('/games/:id', GameController.getGameById);
routes.post('/games', GameController.registerGame);
routes.put('/games/:id', GameController.updateGame);
routes.delete('/games/:id', GameController.deleteGame);

export default routes;