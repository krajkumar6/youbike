var nodemailer = require('nodemailer');

module.exports = function(appo){
    
//app.use('/sayHello', router);
//router.post('/', handleSayHello); // handle the route at yourdomain.com/sayHello

// Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'youbikecs@gmail.com', // Your email id
            pass: 'saty2020' // Your password
        }
    });
    
    var text = 'Appointment Details \n\n' + 'Bike Make: ' + appo.bike.brand + '\n\nBike Model: ' + appo.bike.model + '\n\nBike Year: ' + appo.bike.year +'\n\nRegistration No: ' + appo.bike.regno;
    
    var mailOptions = {
        from: 'youbikecs@gmail.com', // sender address
        //to: appo.cust.email, // list of receivers
        bcc:'youbikecs@gmail.com',
        subject: 'Test Appointment for '+ appo.appoidt.toDateString(), // Subject line
        text: text //, // plaintext body
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };
       
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
        console.log(error);
        //res.json({yo: 'error'});
        }else{
        console.log('Message sent: ' + info.response);
        //res.json({yo: info.response});
        };
    });
    

    
         
}
/*module.exports = function(app){
    
//app.use('/sayHello', router);
//router.post('/', handleSayHello); // handle the route at yourdomain.com/sayHello

app.post('/api/sayHello',function(req,res){
    
    // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'youbikecs@gmail.com', // Your email id
            pass: 'saty2020' // Your password
        }
    });
    
    var text = 'Hello world from \n\n' + req.body.name;
    var mailOptions = {
        from: 'youbikecs@gmail.com', // sender address
        to: 'youbikecs@gmail.com', // list of receivers
        subject: 'Test email', // Subject line
        text: text //, // plaintext body
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };
       
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
        console.log(error);
        res.json({yo: 'error'});
        }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
        };
    });
    
});
    
         
}*/