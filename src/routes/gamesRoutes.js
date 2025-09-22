import express from 'express';
import GameController from '../controllers/gameController.js';

const router = express.Router();

router
  .get('/games', GameController.getGames)
  .get('/games/search', GameController.getGamesByTitle)
  .get('/games/:id', GameController.getGameById)
  .post('/games', GameController.registerGame)
  .put('/games/:id', GameController.updateGame)
  .delete('/games/:id', GameController.deleteGame);

export default router;