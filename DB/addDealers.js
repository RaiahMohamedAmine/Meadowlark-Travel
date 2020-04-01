var dealerModel = require ('./models/dealerModel');

new dealerModel ({
    name: "Raiah Mohamed Amine",
    address1 : "DNC",
    address2:"Rue de la liberte",
    city :"DBK",
    state :"Tizi",
    zip :"35400",
    country :"Algeria",
    phone :'0554704401',
    website : "wwww.google.com",
    active :true,
    geocodedAddress :'',
    lat :0,
    lng :0
}).save ((err)=>{
    if (err) console.log (err);
});

new dealerModel ({
    name: "Sehdi Mohamed NAssim",
    address1 : "Arziou",
    address2:"Dar Nassim",
    city :"Arziou",
    state :"Oran",
    zip :"35400",
    country :"Algeria",
    phone :'0775658945',
    website : "wwww.google.com",
    active :true,
    geocodedAddress :'',
    lat :0,
    lng :0
}).save ((err)=>{
    if (err) console.log (err);
});

new dealerModel ({
    name: "Benmoussat Mohamed Mouad",
    address1 : "Hesnaoui",
    address2:"Rue de la bbzbzbzbz",
    city :"Somewhere",
    state :"Oran",
    zip :"35400",
    country :"Algeria",
    phone :'0554704401',
    website : "wwww.google.com",
    active :true,
    geocodedAddress :'',
    lat :0,
    lng :0
}).save ((err)=>{
    if (err) console.log (err);
});