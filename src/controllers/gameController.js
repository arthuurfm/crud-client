import { developer } from "../models/Developer.js";
import game from "../models/Game.js";

class GameController {

  // acessa todos os jogos cadastrados.
  static async getGames(req, res) {
    try {
      const gameList = await game.find({});
      res.status(200).json(gameList);
    } catch (error) {
      res.status(500).json({
        message: `REQUEST FAILURE - ${error.message}`
      });
    }
  }

  // acessa um jogo pelo id.
  static async getGameById(req, res) {
    try {
      const id = req.params.id;

      const gameFound = await game.findById(id);
      res.status(200).json(gameFound);
    } catch (error) {
      res.status(500).json({
        message: `GAME REQUEST FAILURE - ${error.message}`
      });
    }
  }

  // busca um jogo pelo título.
  static async getGamesByTitle(req, res) {
    const title = req.query.title;
    try {
      const gameByTitle = await game.find({title: title});
      res.status(200).json(gameByTitle);
    } catch (error) {
      res.status(500).json({message: `SEARCH FAILURE - ${error.message}`})
    }
  }

  // atualiza um jogo pelo id.
  static async updateGame(req, res) {
    try {
      const id = req.params.id;
      const newData = req.body;

      await game.findByIdAndUpdate(id, newData);
      res.status(200).json({
        message: 'Updated game'
      });
    } catch (error) {
      res.status(500).json({
        message: `UPDATE FAILURE - ${error.message}`
      });
    }
  }

  // cadastra um novo jogo.
  static async registerGame(req, res) {
    const newGame = req.body;
    try {
      const developerFound = await developer.findById(newGame.developer);
      const completeGame = {...newGame, developer: {...developerFound._doc}};
      const createdGame = await game.create(completeGame);
      res.status(201).json({
        message: 'Successfully registered',
        game: createdGame
      });
    } catch (error) {
      res.status(500).json({
        message: `REGISTRATION FAILURE - ${error.message}`
      });
    }
  }

  // deleta um jogo.
  static async deleteGame(req, res) {
    try {
      const id = req.params.id;

      await game.findByIdAndDelete(id);
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

export default GameController;