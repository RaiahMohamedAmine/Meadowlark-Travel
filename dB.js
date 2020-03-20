var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://amine:amine@cluster0-vbjw6.mongodb.net/test?retryWrites=true&w=majority',{
    dbName : 'vacation',
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true,
    }, (err)=> {
        if (err) console.log ('Failed to connect to DB : ' +err);
        else console.log ('Connected to DB !');
});
