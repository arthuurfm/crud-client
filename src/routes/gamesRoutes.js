import express from 'express';
import GameController from '../controllers/gameController.js';
import pagination from '../middlewares/pagination.js';

const router = express.Router();

router
  .get('/games', GameController.getGames, pagination)
  .get('/games/search', GameController.getGamesByFilter, pagination)
  .get('/games/:id', GameController.getGameById)
  .post('/games', GameController.registerGame)
  .put('/games/:id', GameController.updateGame)
  .delete('/games/:id', GameController.deleteGame);

export default router;