const express = require('express')
      ,path = require('path')
      ,cookieParser = require('cookie-parser')
      ,session = require('express-session');

const morgan = require('morgan');
const flash = require('connect-flash');
const passport = require('passport');
require('dotenv').config();

// routes
const indexRouter = require('./routes');
const authRouter = require('./routes/auth');

const { sequelize } = require('./models');

const passportConfig = require('./passport');
sequelize.sync();
passportConfig(passport);
const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser(process.env.COOKIESECRET));
app.use(session({
  resave : false,
  saveUninitialized : false,
  secret : process.env.COOKIESECRET,
  cookie : {
    httpOnly : true,
    secure : false
  }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/', (req, res, next) =>{
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use('/', (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.message = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log('server start');
});
