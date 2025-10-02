import NotFound from '../errors/NotFound.js';
import BadRequest from '../errors/BadRequest.js';
import { developer } from '../models/index.js';
import { game } from '../models/index.js';

class GameController {

  // acessa todos os jogos cadastrados.
  static async getGames(req, res, next) {
    try {
      let {limit = 5, page = 1, sort='_id:-1'} = req.query;

      let [orderingField, order] = sort.split(':');

      limit = parseInt(limit);
      page = parseInt(page);
      order = parseInt(order);

      if (limit > 0 && page > 0) {
        const gameList = await game
          .find()
          .sort({[orderingField]: order})
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('developer')
          .exec();
  
        res.status(200).json(gameList);      
      } else {
        next(new BadRequest());
      }

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
       return next(new NotFound('Game ID not found'));
      }

      res.status(200).json(gameFound);
    } catch (error) {
      next(error);
    }
  }

  // busca um jogo pelo título.
  static async getGamesByFilter(req, res, next) {
    try {
      const {title, minPrice, maxPrice, developerName} = req.query;

      const search = {};

      if (title) search.title = {
        $regex: title,
        $options: 'i'
      };

      if (minPrice || maxPrice) search.price = {};
      // gte = greater than or equal.
      if (minPrice) search.price.$gte = minPrice;
      // lte = less than or equal.
      if (maxPrice) search.price.$lte = maxPrice;

      if (developerName) {
        search['developer.name'] = {
          $regex: developerName,
          $options: 'i'
        }

        const gameByTitle = await game.find(search);
        res.status(200).json(gameByTitle);
      }

    } catch (error) {
      next(error);
    }
  }

  // cadastra um novo jogo.
  static async registerGame(req, res, next) {
    const newGame = req.body;
    try {
      const developerFound = await developer.findById(newGame.developer);
      // se não for encontrado.
      if (!developerFound) {
        return next(new NotFound('Developer ID not found'));
      }

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

      const gameFound = await game.findByIdAndUpdate(id, newData);
      // se não for encontrado.
      if (!gameFound) {
        return next(new NotFound('Game ID not found'));
      }

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

      const gameFound = await game.findByIdAndDelete(id);
      // se não for encontrado.
      if (!gameFound) {
        return next(new NotFound('Game ID not found'));
      }

      res.status(200).json({
        message: 'Successfully deleted'
      });
    } catch (error) {
      next(error);
    }
  }

};

export default GameController;