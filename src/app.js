import express from 'express';
import dbConnect from './config/dbConnect.js';
import routes from './routes/index.js';

const connection = await dbConnect();
// se houver algum erro, dispara o erro.
connection.on('error', (error) => {
  console.error('Connection error:', error);
});

// se tudo certo, se conecta com db.
connection.once('open', () => {
  console.log('Database connection successfully.');
});

const app = express();
routes(app);

function searchGame(id) {
  return games.findIndex(game => {
    // converter o id para Number, porque o http só interpreta string.
    return game.id === Number(id);
  });
}

// puxa o game pelo id informado.
app.get('/games/:id', (req, res) => {
  const index = searchGame(req.params.id);
  res.status(200).json(games[index]);
});

// atualiza um game pelo id informado.
app.put('/games/:id', (req, res) => {
  const index = searchGame(req.params.id);
  games[index].title = req.body.title;
  res.status(200).send('Updated successfully');
});

// deleta um game pelo id.
app.delete('/games/:id', (req, res) => {
  const index = searchGame(req.params.id);
  games.splice(index, 1);
  res.status(200).send('Successfully deleted');
});

export default app;