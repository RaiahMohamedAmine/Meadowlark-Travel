var http =require ('http');

module.exports = (query,cb)=>{
    const options= {
        hostname : 'maps.googleapis.com',
        path : '/maps/api/geocode/json?address=' +
        encodeURIComponent(query) + '&sensor=false',
    } ;
    http.request (options, (res)=>{
        var data='';
        res.on ('data', (chunk)=>{
            data +=chunk;
        });

        res.on ('end', (chunk)=>{
            data = JSON.parse (data);
            if (data.results.length) 
                cb (null, data.results[0].geometry.location);
            else
                cb("No results found",null);
        });
    }).end ();
}

var dealerCache = {
    lastRefreshed: 0,
    refreshInterval: 60 * 60 * 1000,
    jsonUrl: '/dealers.json',
    geocodeLimit: 2000,
    geocodeCount: 0,
    geocodeBegin: 0,
    }
dealerCache.jsonFile = __dirname +
    '/public' + dealerCache.jsonUrl;


function geocodeDealer(dealer){
    var addr = dealer.getAddress(' ');
    if(addr===dealer.geocodedAddress) return; // already geocoded
    if(dealerCache.geocodeCount >= dealerCache.geocodeLimit){
        // has 24 hours passed since we last started geocoding?
        if(Date.now() > dealerCache.geocodeCount + 24 * 60 * 60 * 1000){
            dealerCache.geocodeBegin = Date.now();
            dealerCache.geocodeCount = 0;
        } else {
        // we can't geocode this now: we've
        // reached our usage limit
        return;
        }
    }
    geocode(addr, function(err, coords){
        if(err) return console.log('Geocoding failure for ' + addr);
            dealer.lat = coords.lat;
            dealer.lng = coords.lng;
            dealer.save();
        });
    }