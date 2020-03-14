var express = require('express');
var app = express();
var handleBars = require ('express-handlebars').create ({defaultLayout :'main'});
var fortune = require('./fortune'); 

app.set('port', process.env.PORT || 3000) ;

app.use (express.static(__dirname + '/public'));
app.engine('handlebars', handleBars.engine) ;
app.set ('view engine', 'handlebars');

app.use ((req,res,next)=> {
    res.locals.showTests = app.get('env')!== 'production' && req.query.test==='1' ;
    next ();
})


app.get('/', function(req, res){
    res.render('home'); 
    console.log (req.acceptsLanguages ());
});
app.get('/about', function(req, res){
    res.status('200').render('about', {
        fortune,
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