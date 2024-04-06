const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
var methodOverride = require('method-override')


env.config();

const pageController = require('./controllers/pageController');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

//DB CONNECT
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('DB CONNECTED'))
  .catch((err) => console.log(err));

//Template Engine
app.set('view engine', 'ejs');

//GLOBAL VARIABLE
global.userIn = null;

//Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method', {
  methods : ['GET','POST']
}));
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessage = req.flash();
  next();
});

app.use('*', (req, res, next) => {
  global.userIn = req.session.userID;
  next();
});

//ROUTES
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = 3000;

app.listen(port, () => {
  console.log('Sunucu Calisti !!');
});
