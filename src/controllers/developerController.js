import {developer} from "../models/Developer.js";

class DeveloperController {

  // acessa todos os desenvolvedores cadastrados.
  static async getDevelopers(req, res) {
    try {
      const developerList = await developer.find({});
      res.status(200).json(developerList);
    } catch (error) {
      res.status(500).json({
        message: `REQUEST FAILURE - ${error.message}`
      });
    }
  }

  // acessa um desenvolvedor pelo id.
  static async getDeveloperById(req, res) {
    try {
      const id = req.params.id;

      const developerFound = await developer.findById(id);
      res.status(200).json(developerFound);
    } catch (error) {
      res.status(500).json({
        message: `DEVELOPER REQUEST FAILURE - ${error.message}`
      });
    }
  }

  // atualiza um desenvolvedor pelo id.
  static async updateDeveloper(req, res) {
    try {
      const id = req.params.id;
      const newData = req.body;

      await developer.findByIdAndUpdate(id, newData);
      res.status(200).json({
        message: 'Updated developer'
      });
    } catch (error) {
      res.status(500).json({
        message: `UPDATE FAILURE - ${error.message}`
      });
    }
  }

  // cadastra um novo desenvolvedor.
  static async registerDeveloper(req, res) {
    try {
      const newDeveloper = await developer.create(req.body);
      res.status(201).json({
        message: 'Successfully registered',
        developer: newDeveloper
      });
    } catch (error) {
      res.status(500).json({
        message: `REGISTRATION FAILURE - ${error.message}`
      });
    }
  }

  // deleta um desenvolvedor pelo id.
  static async deleteDeveloper(req, res) {
    try {
      const id = req.params.id;

      await developer.findByIdAndDelete(id);
      res.status(200).json({
        message: 'Successfully deleted'
      });
    } catch (error) {
      res.status(500).json({
        message: `DELETE FAILURE = ${error.message}`
      });
    }
  }

};

export default DeveloperController;