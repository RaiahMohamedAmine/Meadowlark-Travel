var mongoose = require('mongoose');

mongoose.connect(require('../credentials').mongoUrl,{
    dbName : 'vacation',
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true,
    }, (err)=> {
        if (err) console.log ('Failed to connect to DB : ' +err);
        else console.log ('Connected to DB !');
});
