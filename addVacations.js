var vacationModel = require('./vacationModel');


new vacationModel({
    name: 'Hood River Day Trip',
slug: 'hood-river-day-trip',
category: 'Day Trip',
sku: 'HR199',
description: 'Spend a day sailing on the Columbia and ' +
'enjoying craft beers in Hood River!',
priceInCents: 9995,
tags: ['day trip', 'hood river', 'sailing', 'windsurfing', 'breweries'],
inSeason: true,
maximumGuests: 16,
available: true,
packagesSold: 0,
}).save ((err, product)=> {
    if (err) console.log (err);
    else console.log (product);
});

new vacationModel({
    name: 'Oregon Coast Getaway',
    slug: 'oregon-coast-getaway',
    category: 'Weekend Getaway',
    sku: 'OC39',
    description: 'Enjoy the ocean air and quaint coastal towns!',
    priceInCents: 269995,
    tags: ['weekend getaway', 'oregon coast', 'beachcombing'],
    inSeason: false,
    maximumGuests: 8,
    available: true,
    packagesSold: 0,
}).save ((err, product)=> {
    if (err) console.log (err);
    else console.log (product);
});


new vacationModel({
    name: 'Rock Climbing in Bend',
    slug: 'rock-climbing-in-bend',
    category: 'Adventure',
    sku: 'B99',
    description: 'Experience the thrill of climbing in the high desert.',
    priceInCents: 289995,
    tags: ['weekend getaway', 'bend', 'high desert', 'rock climbing'],
    inSeason: true,
    requiresWaiver: true,
    maximumGuests: 4,
    available: false,
    packagesSold: 0,
    notes: 'The tour guide is currently recovering from a skiing accident.',
}).save ((err, product)=> {
    if (err) console.log (err);
    else console.log (product);
});
