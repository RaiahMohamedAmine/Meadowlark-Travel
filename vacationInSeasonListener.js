var mongoose = require ('mongoose');

var vacationInSeasonListenerSchema = mongoose.Schema({
    email : String,
    skus : [String]
});

var vacationInSeasonListener = mongoose.model ('VacationInSeasonListener', vacationInSeasonListenerSchema);
module.exports=vacationInSeasonListener;