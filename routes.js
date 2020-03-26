var main = require ('./handlers/home');
var vacation =require('./handlers/vacations');
var fails = require ('./handlers/fails');
var attraction =require ('./handlers/attraction');

module.exports = (app)=>{

app.get ('/',main.home) ;  
app.get ('/about',main.about) ;  
app.get ('/jqeury',main.jquery) ;  
app.get ('/download',main.download) ;  
app.get('/cart/checkout', main.cartCheckout);

app.get ('/vacations',vacation.vacations);
app.get ('/set-currency/:currency',vacation.setCurrency);
app.get ('/notify-me-when-in-season',vacation.notifyGET);
app.post ('/notify-me-when-in-season',vacation.notifyPOST);
app.get ('/contest/vacation-photo',vacation.contestVacationPhoto);
app.get ('/contest/vacation-photo/:year/:month',vacation.contestVacationPhotoWithParams);
app.get ('/fail', fails.fails);
app.get ('/epic-fail', fails.epicFails);
app.get ('/api/attractions', attraction.GetAttractions);
app.get ('/api/attraction/:id', attraction.GetAttractionById);
app.post ('/api/attraction', attraction.PostAttraction);
}