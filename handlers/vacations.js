var formidale = require('formidable');
var vacationModel = require ('../DB/models/vacationModel');
var vacationInSeasonListener = require ('../DB/models/vacationInSeasonListenerModel');

exports.vacations =(req,res)=>{
    console.log ( req.currency);
    vacationModel.find ({available : true},(err,vacations)=> {
        if (err) {console.log (err);}
        else{
            var currency = req.currency || 'USD';
           // console.log (currency);
            var context = {
                currency,
                vacations : vacations.map((vacation)=> {
                    return {
                        sku : vacation.sku,
                        name : vacation.name,
                        description : vacation.description,
                        price : convertFromUSD(vacation.priceInCents/100, currency),
                        inSeason : vacation.inSeason,
                    }
                })
            };
            switch(currency) {
                case 'USD': context.currencyUSD = 'selected'; break;
                case 'GBP': context.currencyGBP = 'selected'; break;
                case 'BTC': context.currencyBTC = 'selected'; break;
            }
         //   console.log (context);
             res.render('vacations',{currency ,vacations : context.vacations});
        };
    });
};

exports.setCurrency =(req,res)=>{
    req.currency = req.params.currency ;
    // console.log (req.currency);
     return res.redirect (303,'/vacations');
};

exports.notifyGET =(req,res)=> {
    res.render ('notify-me-when-in-season', {sku: req.query.sku});
};

exports.notifyPOST = (req,res)=> {
    vacationInSeasonListener.update (
        {email : req.body.email},
        {$push : {sku : req.body.sku}},
        {upsert : true}, 
        (err)=> {
            if (err){
                console.log (err);
                req.session.flash ={
                    type: 'danger',
                    intro : 'Oops !',
                    message : ' There was an error processing your request'
                };
            }
            else{
                req.session.flash ={
                    type : 'success',
                    intro : ' Thanak ou !',
                    message : 'Well done',
                }
                return 
            }
        }
    );
};

exports.contestVacationPhoto = (req,res)=> {
    var now = new Date ();
    res.render ('contest/vacation-photo', {
        year : now.getFullYear(),
        month : now.getMonth ()
    });
};

exports.contestVacationPhotoWithParams = (req,res)=> {
    var form = new formidale.IncomingForm ();
    form.parse (req, (err,fields,files)=> {
        if (err) res.status(404).render ('404');
        console.log (fields);
        console.log (files);
    });
};


function convertFromUSD (value,currency) {
    switch (currency){
    case 'USD' : return value*1;
    case 'GBP' : return value * 0.6;
    case 'BTC' : return value * 0.0023707918444761;
    default : return NaN;
}};