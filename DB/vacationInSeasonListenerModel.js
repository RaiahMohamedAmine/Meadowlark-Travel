var mongoose = require ('mongoose');

var vacationInSeasonListenerSchema = mongoose.Schema({
    email : String,
    skus : [String]
});

var vacationInSeasonListenerModel = mongoose.model ('VacationInSeasonListener', vacationInSeasonListenerSchema);
module.exports=vacationInSeasonListenerModel;