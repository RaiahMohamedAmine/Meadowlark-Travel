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
var formidale = require('formidable');
var fortunes = require('./fortune'); 
var weather = require('./weather');
var mailer = require('./mailer')  ;
var fs = require ('fs');

app.set('port', process.env.PORT || 3000) ;
app.use (express.static(__dirname + '/public'));
app.engine('handlebars', handleBars.engine) ;
app.set ('view engine', 'handlebars');
app.use(require('body-parser').json ());
app.use(require ('cookie-parser') (require('./credentials').cookieSecret));

app.use ((req,res,next)=> {
    //Middlewar for Page tests
    res.locals.showTests = app.get('env')!== 'production' && req.query.test==='1' ;
    next ();
})

app.use ((req,res,next)=> {
    //Middleware for testing partials and setting the weather local's value
    if (!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weather = weather ();
    next();
})

/*app.use((req,res,next)=> {
    //Midlleware used for setting response session 
    res.locals.flash = req.locals.flash ;
    delete req.locals.flash;
    next ();
});*/

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

app.get ('/cart/checkout', (req,res)=> {
    var cart = {} ;
    cart.number = Math.random().toString().replace(/^0\.0*/, '');
    cart.billing = {
        name : "Raiah moahmed Amine",
        email : 'hm_raiah@esi.dz',
    };
    console.log (cart);
    res.render ('email/ThankYou', {
        layout : null,
        cart},
        (err, html)=>{
        if (err) console.log(err);
        else {
            mailer.sendMail ({
            from : '"Meadowlark Travel " info@meadowlark.com',
            to : cart.billing.email,
            subject : 'Thank You for Book your Trip with Meadowlark',
            html,
            generateTextFromHtml : true,
            attachments : [{
                filename : "LOGO",
                content : fs.createReadStream (__dirname+ '/public/email/logo.png')
            }]
        }, (err)=> {
            if (err) console.log ('Unable to send the email : ' +err);
            else console.log ('The e-mail has been sent to ' + cart.billing.email);
        })};
    });
    res.render ('cart-thank-you', {cart});
});

app.get('/download', (req,res)=> {
    res.download (__dirname +'/public/img/Logo.jpg', (err)=> {
        console.log (err);
    });
});

app.get ('/contest/vacation-photo', (req,res)=> {
    var now = new Date ();
    res.render ('contest/vacation-photo', {
        year : now.getFullYear(),
        month : now.getMonth ()
    });

});

app.post ('/contest/vacation-photo/:year/:month', (req,res)=>{
    var form = new formidale.IncomingForm ();
    form.parse (req, (err,fields,files)=> {
        if (err) res.status(404).render ('404');
        console.log (fields);
        console.log (files);
    })
});

app.post('/newsletter' , (req,res)=> {
    var name= req.body.name || '' ;
    var email = req.body.email || '';
    if (!email.match (VALID_EMAIL_REGEX)){
        if (req.xhr) res.json ({ error : " Invalid email address"});
        req.session.flash = {
            type : 'danger',
            intro : ' Validation Error',
            message : 'The Email adress you entred was not valid'
        };
        return res.redirect(303, '/newsletter/archive'); 
    }
    new NewsletterSignUp ({name, email}).save  ((err)=> {
        if (err){
            if(req.xhr) return res.json({ error: 'Database error.' });
            req.session.flash = {
                type: 'danger',
                intro: 'Database error!',
                message: 'There was a database error; please try again later.',
            }
            return res.redirect(303, '/newsletter/archive');
        }
        if(req.xhr) return res.json({ success: true });
        req.session.flash = {
            type: 'success',
            intro: 'Thank you!',
            message: 'You have now been signed up for the newsletter.',
        };
        return res.redirect(303, '/newsletter/archive');
    });
});

app.use ((req,res)=> {
    res.render('404');
});

app.use ((req,res)=> {
    res.type('text/plain');
    res.status (500);
    res.send('500 - Not Found');
});

app.listen (app.get ('port'), ()=> {
    console.log ('Server started at port : ' + app.get('port'));
})