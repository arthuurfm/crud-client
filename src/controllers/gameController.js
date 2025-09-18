import { developer } from '../models/Developer.js';
import game from '../models/Game.js';

class GameController {

  // acessa todos os jogos cadastrados.
  static async getGames(req, res, next) {
    try {
      const gameList = await game.find({});
      res.status(200).json(gameList);
    } catch (error) {
      next(error);
    }
  }

  // acessa um jogo pelo id.
  static async getGameById(req, res, next) {
    try {
      const id = req.params.id;
      const gameFound = await game.findById(id);

      // se não for encontrado.
      if (!gameFound) {
        res.status(404).send({
          status: 404,
          message: 'Game ID not found.'
        }
        );
      }

      res.status(200).json(gameFound);
    } catch (error) {
      next(error);
    }
  }

  // busca um jogo pelo título.
  static async getGamesByTitle(req, res, next) {
    const title = req.query.title;
    try {
      const gameByTitle = await game.find({ title: title });
      res.status(200).json(gameByTitle);
    } catch (error) {
      next(error);
    }
  }

  // cadastra um novo jogo.
  static async registerGame(req, res, next) {
    const newGame = req.body;
    try {
      const developerFound = await developer.findById(newGame.developer);
      const completeGame = { ...newGame, developer: { ...developerFound } };
      const createdGame = await game.create(completeGame);
      res.status(201).json({
        message: 'Successfully registered',
        game: createdGame
      });
    } catch (error) {
      next(error);
    }
  }

  // atualiza um jogo pelo id.
  static async updateGame(req, res, next) {
    try {
      const id = req.params.id;
      const newData = req.body;

      await game.findByIdAndUpdate(id, newData);
      res.status(200).json({
        message: 'Updated game'
      });
    } catch (error) {
      next(error);
    }
  }

  // deleta um jogo.
  static async deleteGame(req, res, next) {
    try {
      const id = req.params.id;

      await game.findByIdAndDelete(id);
      res.status(200).json({
        message: 'Successfully deleted'
      });
    } catch (error) {
      next(error);
    }
  }

};

export default GameController;