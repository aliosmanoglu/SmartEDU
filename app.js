const express = require('express');


const pageController = require('./controllers/pageController');

const app = express();

//Template Engine
app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));


//ROUTES
app.get('/', pageController.getIndex);
app.get('/about', pageController.getIndex);
app.get('/contact', pageController.getContact);
app.get('/dasbhoard', pageController.getDashboard);


const port = 3000;

app.listen(port, () => {
  console.log('Sunucu Calisti !!');
});
