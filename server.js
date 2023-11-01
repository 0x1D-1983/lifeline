const express = require('express');
const app = express();

app.set('view engine', 'pug');

//static assets
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/img'));
app.use(express.static(__dirname + '/fonts'));

app.get('/', (req, res) => {
    res.render('index', {
      menu: 'index'
    });
  });

app.get('/services', (req, res) => {
  res.render('services', {
    menu: 'services'
  });
});

app.get('/staff', (req, res) => {
  res.render('staff', {
    menu: 'staff'
  });
});

app.get('/blog', (req, res) => {
  res.render('blog', {
    menu: 'blog'
  });
});

const server = app.listen(8080, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });