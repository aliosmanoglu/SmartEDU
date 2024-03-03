const express = require('express');

const pageController = require('./controllers/pageController');
const pageRoute = require('./routes/pageRoutes');

const app = express();

//Template Engine
app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));

//ROUTES
app.use('/',pageRoute);


const port = 3000;

app.listen(port, () => {
  console.log('Sunucu Calisti !!');
});
