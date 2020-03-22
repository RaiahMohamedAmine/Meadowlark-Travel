
exports.fails =(req,res)=> {
    throw new Error ('Nope !');
};

exports.epicFails = (req,res)=>{
    //this errrr stops emmediatly the server 
    process.nextTick(function(){
        throw new Error('Kaboom!');
    });
};