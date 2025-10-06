import NotFound from '../errors/NotFound.js';
import { developer } from '../models/index.js';

class DeveloperController {

  // acessa todos os desenvolvedores cadastrados.
  static async getDevelopers(req, res, next) {
    try {
      const developerList = developer.find({});
      req.result = developerList;
      next();
    } catch (error) {
      next(error);
    }
  }

  // acessa um desenvolvedor pelo id.
  static async getDeveloperById(req, res, next) {
    try {
      const id = req.params.id;

      const developerFound = await developer.findById(id);
      // se não for encontrado.
      if (!developerFound) {
        return next(new NotFound('Developer ID not found'));
      }

      res.status(200).json(developerFound);
    } catch (error) {
      next(error);
    }
  }

  // atualiza um desenvolvedor pelo id.
  static async updateDeveloper(req, res, next) {
    try {
      const id = req.params.id;
      const newData = req.body;

      const developerFound = await developer.findByIdAndUpdate(id, newData);
      // se não for encontrado.
      if (!developerFound) {
        return next(new NotFound('Developer ID not found'));
      }

      res.status(200).json({
        message: 'Updated developer'
      });
    } catch (error) {
      next(error);
    }
  }

  // cadastra um novo desenvolvedor.
  static async registerDeveloper(req, res, next) {
    try {
      const newDeveloper = await developer.create(req.body);
      res.status(201).json({
        message: 'Successfully registered',
        developer: newDeveloper
      });
    } catch (error) {
      next(error);
    }
  }

  // deleta um desenvolvedor pelo id.
  static async deleteDeveloper(req, res, next) {
    try {
      const id = req.params.id;

      const developerFound = await developer.findByIdAndDelete(id);
      // se não for encontrado.
      if (!developerFound) {
        return next(new NotFound('Developer ID not found'));
      }

      res.status(200).json({
        message: 'Successfully deleted'
      });
    } catch (error) {
      next(error);
    }
  }

};

export default DeveloperController;