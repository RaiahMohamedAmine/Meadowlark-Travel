var fortunes = require ('../lib/fortune');
var mailer = require('./mailer')  ;
var fs = require ('fs');

exports.home = (req,res)=> {
    res.render('home');
};

exports.about = (req,res)=> {
    res.render ('about', {
        date : new Date (),
        name : 'Raiah Mohamed Amine',
        fortunes,
        pageTestScript : '/qa/test-about.js',
    });
};

exports.download = (req,res)=> {
    res.download (__dirname +'/../public/img/Logo.jpg', (err)=> {
        console.log (err);
    });
};

exports.jquery = (req,res)=> {
    res.render('jquery-test'); 
};

exports.newsLetter = (req,res)=>{
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
};

exports.cartCheckout =(req,res)=>{
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
};
