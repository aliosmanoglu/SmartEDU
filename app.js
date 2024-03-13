const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');

env.config();

const pageController = require('./controllers/pageController');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');


const app = express();

//DB CONNECT
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('DB CONNECTED'))
  .catch((err) => console.log(err));

//Template Engine
app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);

const port = 3000;

app.listen(port, () => {
  console.log('Sunucu Calisti !!');
});
