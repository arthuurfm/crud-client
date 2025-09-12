import express from 'express';

const app = express();

// middleware que manipula "req".
app.use(express.json());

const games = [
  {
    id: 1,
    title: 'Red Dead Redemption 2'
  },
  {
    id: 2,
    title: 'Counter Strike'
  }
];

function searchGame(id) {
  return games.findIndex(game => {
    // converter o id para Number, porque o http só interpreta string.
    return game.id === Number(id);
  });
}

// rota home.
app.get('/', (req, res) => {
  res.status(200).send('Home');
});

// todos os jogos cadastrados.
app.get('/games', (req, res) => {
  res.status(200).json(games);
});

// puxa o game pelo id informado.
app.get('/games/:id', (req, res) => {
  const index = searchGame(req.params.id);
  res.status(200).json(games[index]);
});

// cadastra um novo game.
app.post('/games', (req, res) => {
  games.push(req.body);
  res.status(201).send('Successfully registered');
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