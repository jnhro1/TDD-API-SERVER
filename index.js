const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

if(process.env.NODE_ENV !== 'test'){
  app.use(morgan('dev'));

}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let users = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
];


app.get('/users', (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = +req.query.limit;
  if (Number.isNaN(limit)) return res.status(400).end();
  res.json(users.slice(0, limit));
});

app.get('/users/:id', (req, res) => {
  const id = +req.params.id;
  if (Number.isNaN(id)) return res.status(400).end();
  const user = users.find(user => user.id === id);
  if (!user) return res.status(404).end();
  res.json(user);
});

app.delete('/users/:id', (req, res) => {
  const id = +req.params.id;
  if (Number.isNaN(id)) return res.status(400).end();
  users = users.filter(user => user.id !== id);
  res.status(204).end();
});

app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).end();
  if (users.find(user => user.name === name)) return res.status(409).end();
  const id = users.length + 1;
  const user = { id, name };
  users = [...users, user];
  res.status(201).json(user);
});

app.put('/users/:id', (req, res) => {
  const id = +req.params.id;
  if (Number.isNaN(id)) return res.status(400).end();
  const { name } = req.body;
  if (!name) return res.status(400).end();
  const user = users.find(user => user.id === id);
  if (!user) return res.status(404).end();
  const isConflict = users.find(user => user.name === name);
  if (isConflict) return res.status(409).end();
  user.name = name;
  users = [...users.filter(user => user.id !== id), user];
  res.json(user);
});

// supertest 환경에서는 app.listen이 중복코드이기 때문에 없어도 된다.

module.exports = app;
