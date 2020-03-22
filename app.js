var express = require('express');
var app = express();
var handleBars = require ('express3-handlebars').create ({
    defaultLayout :'main',
    helpers: {
        section: function (name, options){
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
        }
    }
});

var weather = require('./weather');
/*var mongoseSessionStore = require ('session-mongoose')(require('connect'));
var sessionStore = new mongoseSessionStore({url: require('./credentials').mongoUrl});*/

require('./DB/dB');
app.set('port', process.env.PORT || 3000) ;
app.use (express.static(__dirname + '/public'));
app.engine('handlebars', handleBars.engine) ;
app.set ('view engine', 'handlebars');
app.use(require('body-parser').json ());
app.use(require ('cookie-parser') (require('./credentials').cookieSecret));
//app.use (require('express-session')({store : sessionStore}));

app.use ((req,res,next)=> {
    //Middlewar for Page tests
    res.locals.showTests = app.get('env')!== 'production' && req.query.test==='1' ;
    next ();
});

app.use ((req,res,next)=> {
    var cluster = require('cluster') ;
    if (cluster.isWorker)  console.log ('Worker N~ : %d received request', cluster.worker.id); 
    next ();
});

app.use ((req,res,next)=> {
    //Middleware for testing partials and setting the weather local's value
    if (!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weather = weather ();
    if (!req.currency) req.currency ='USD';
    else console.log ('nope');
    next();
});
/*
app.use((req,res,next)=> {
    //Midlleware used for setting response session 
    res.locals.flash = req.locals.flash ;
    delete req.locals.flash;
    next ();
});*/
require ('./routes')(app);

app.use ((req,res)=> {
    res.render('404');
});

app.use ((req,res)=> {
    res.type('text/plain');
    res.status (500);
    res.send('500 - Not Found');
});

app.use ((err,req,res,next)=>{
    res.status(500).render ('404');
});

app.listen (app.get ('port'), ()=> {
    console.log ('Server started at port : ' + app.get('port'));
});
