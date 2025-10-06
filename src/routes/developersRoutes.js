import express from 'express';
import DeveloperController from '../controllers/developerController.js';
import pagination from '../middlewares/pagination.js';

const router = express.Router();

router
  .get('/developers', DeveloperController.getDevelopers, pagination)
  .get('/developers/:id', DeveloperController.getDeveloperById)
  .post('/developers', DeveloperController.registerDeveloper, pagination)
  .put('/developers/:id', DeveloperController.updateDeveloper)
  .delete('/developers/:id', DeveloperController.deleteDeveloper);

export default router;