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
var fortunes = require('./fortune'); 
var weather = require('./weather');

app.set('port', process.env.PORT || 3000) ;

app.use (express.static(__dirname + '/public'));
app.engine('handlebars', handleBars.engine) ;
app.set ('view engine', 'handlebars');

app.use ((req,res,next)=> {
    res.locals.showTests = app.get('env')!== 'production' && req.query.test==='1' ;
    next ();
})

app.use ((req,res,next)=> {
    if (!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weather = weather ();
    next();
})

app.get('/', function(req, res){
    res.render('home'); 
});

app.get('/jquery', function(req, res){
    res.render('jquery-test'); 
});


app.get('/about', function(req, res){
    res.status('200').render('about', {
        date : new Date (),
        name : 'Raiah Mohamed Amine',
        fortunes,
        pageTestScript : '/qa/test-about.js',
    });
});

app.get('/download', (req,res)=> {
    res.download (__dirname +'/public/img/Logo.jpg', (err)=> {
        console.log (err);
    });
    res.send('download') ;
})

app.use ((req,res)=> {
    res.render('404');
});


app.use ((req,res)=> {
    res.type('text/plain');
    res.status (500);
    res.send('500 - Not Found');
})


app.listen (app.get ('port'), ()=> {
    console.log ('Server started at port : ' + app.get('port'));
})