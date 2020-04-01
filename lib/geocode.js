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