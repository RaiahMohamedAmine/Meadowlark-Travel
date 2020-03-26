var attractionModel = require('../DB/models/attractionModel');

exports.GetAttractions = (req,res)=>{
    attractionModel.find ({approved : true}, (err,attractions)=>{
        if (err) return res.send(500, 'Error Occured : Database Error');
        res.json (attractions.map((attraction)=>{
            return {
                name : attraction.name ,
                id : attraction._id,
                description : attraction.description,
                location : attraction.location
            };
        }));
    });
};

exports.PostAttraction = (req,res)=>{
    console.log (req.body);
    var attraction = new attractionModel ({
        name : req.body.name,
        description : req.body.description,
        location :{
            lat :req.body.lat,
            lng :req.body.lng
        },
        history :{
            event : 'created',
            email :req.body.email,
            date : new Date ()
        },
        approved : false
    });
    attraction.save ((err, attraction)=>{
        if (err) return res.send (500, 'Error occured : Database Error');
        res.json ({
            name : attraction.name ,
            id : attraction._id,
            description : attraction.description,
            location : attraction.location
        });
    });
};

exports.GetAttractionById = (req,res)=> {
    attractionModel.findById (req.params.id , (err,attraction)=>{
        if (err) return res.send (500, 'Error occured : Database Error');
        res.json ({
            name : attraction.name ,
            id : attraction._id,
            description : attraction.description,
            location : attraction.location
        });
    });
};