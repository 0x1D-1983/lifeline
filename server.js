const express = require('express');
const app = express();

app.set('view engine', 'pug');

// serve static files from the `public` folder
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/img'));

app.get('/', (req, res) => {
    res.render('index');
  });

app.get('/services', (req, res) => {
  // res.render(req.query.id);
  res.render('services');
});

app.get('/staff', (req, res) => {
  // res.render(req.query.id);
  res.render('staff');
});

app.get('/blog', (req, res) => {
  // res.render(req.query.id);
  res.render('blog');
});

const server = app.listen(8080, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });