var mongoose =require('mongoose');

var attractionSchema = mongoose.Schema ({
    name: String,
    description: String,
    location: { lat: Number, lng: Number },
    history: {
    event: String,
    notes: String,
    email: String,
    date: Date,
    },
    updateId: String,
    approved: Boolean,
});

var attractionModel = mongoose.model ('Attraction',attractionSchema);
module.exports = attractionModel;