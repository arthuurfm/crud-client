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

app.get('/', (req, res) => {
  res.status(200).send('Home');
});

app.get('/games', (req, res) => {
  res.status(200).json(games);
});

app.post('/games', (req, res) => {
  games.push(req.body);
  res.status(201).send('Jogo cadastrado com sucesso.');
});

export default app;