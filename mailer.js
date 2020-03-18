var nodeMailer = require('nodemailer');
var credentials = require('./credentials');
var mailTransprt = nodeMailer.createTransport ({
    service : 'Gmail',
    auth : {
        user : credentials.gmail.user,
        pass : credentials.gmail.pass
    }
});
/*    
mailTransprt.sendMail({
    from : '"Raiah Mohamed Amine" raiah91@gmail.com',
    to : 'hm_raiah@esi.dz',
    subject : 'Your Meadowlark Travel Tour ',
    html: '<h1>Meadowlark Travel</h1>\n<p>Thanks for book your trip with ' +
        'Meadowlark Travel. <b>We look forward to your visit!</b>'+
        '<img src="" alt="Meadowlark Travel"/>',
        generateTextFromHtml : true
   /* text: 'Thank you for booking your trip with Meadowlark Travel. ' +
        'We look forward to your visit!',     
}, (err)=> {
    if (err) {console.log ('**');

        console.log(err);
    }
});*/
module.exports = mailTransprt ;