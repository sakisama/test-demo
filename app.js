var express = require('express');
var flash = require('connect-flash');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var util = require('util');
var routes = require('./routes');
var partials = require('express-partials');
var fs = require('fs');
var accessLogfile = fs.createWriteStream('access.log', {flags: 'a'});
var errorLogfile = fs.createWriteStream('error.log', {flags: 'a'});
//var users = require('./routes/users');
var app = express();
var connect = require('connect');
var MongoStore = require('connect-mongo')(connect);
var settings = require('./settings');

var DB = require('./DB');
var spider = require('./getRss/spiderRss');
var rssSite = require('./config/rssSite.json');
var interval = rssSite.ttl*60*1000;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger(':remote-addr :method :url :status :response-time ms - :res[content-length]'));
app.use(logger({stream: accessLogfile}));
app.use(partials());
app.use(favicon());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(cookieParser());
app.use(connect.session({
secret: settings.cookieSecret,
store: new MongoStore({db: settings.db})
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    var err = req.flash('error');
     var succ = req.flash('success');
    res.locals.user =  req.session.user;

    res.locals.error = err.length?err:null;

    res.locals.success =succ.length?succ:null;

    res.locals.header =req.headers;
    res.locals.inspect = function(obj){
        return util.inspect(obj, true);
    };
   next();
});

routes(app);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.use(function(err, req, res, next){
    var meta = '[' + new Date() + '] ' + req.url + '\n';
    errorLogfile.write(meta + err.stack + '\n');
    next(err);
});
/// error handlers
app.set('env',process.env.NODE_ENV || 'production');
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

DB.init();
setTimeout(function(){
  spider.spiderStart(function(){
    console.log('启动服务器抓取rss');
  });
  setInterval(function(){
    spider.spiderStart(function(){
      console.log('定时抓取rss');
    });
  },interval);
},5000);

module.exports = app;
