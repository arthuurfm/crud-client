import express from 'express';
import DeveloperController from '../controllers/developerController.js';

const routes = express.Router();

routes.get('/developers', DeveloperController.getDevelopers);
routes.get('/developers/:id', DeveloperController.getDeveloperById);
routes.post('/developers', DeveloperController.registerDeveloper);
routes.put('/developers/:id', DeveloperController.updateDeveloper);
routes.delete('/developers/:id', DeveloperController.deleteDeveloper);

export default routes;