var mongoose= require ('mongoose');

var delearSchema = mongoose.Schema ({
    name: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    phone: String,
    website: String,
    active: Boolean,
    geocodedAddress: String,
    lat: Number,
    lng: Number,
});

delearSchema.methods.getAddress = (lineDelim)=>{
    if(!lineDelim) lineDelim = '<br>';
    var addr = this.address1;
    if(this.address2 && this.address2.match(/\S/))
        addr += lineDelim + this.address2;
    addr += lineDelim + this.city + ', ' +
        this.state + this.zip;
    addr += lineDelim + (this.country || 'US');
    return addr;    
}
var Dealer = mongoose.model('Delear',delearSchema,'delear');

module.exports= Dealer;