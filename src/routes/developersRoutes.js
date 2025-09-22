import express from 'express';
import DeveloperController from '../controllers/developerController.js';

const router = express.Router();

router
  .get('/developers', DeveloperController.getDevelopers)
  .get('/developers/:id', DeveloperController.getDeveloperById)
  .post('/developers', DeveloperController.registerDeveloper)
  .put('/developers/:id', DeveloperController.updateDeveloper)
  .delete('/developers/:id', DeveloperController.deleteDeveloper);

export default router;