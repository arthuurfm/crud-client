import game from "../models/Game.js";

class GameController {

  static async getGames(req, res) {
    const gameList = await game.find({});
    res.status(200).json(gameList);
  }

  static async registerGame(req, res) {
    try {
      const newGame = await game.create(req.body);
      res.status(201).json({
        message: 'Successfully registered',
        game: newGame
      });
    } catch (error) {
      res.status(500).json({
        message: `Registration failure - ${error.message}`
      });
    }
  }

};

export default GameController;