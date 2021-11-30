const User = require('../models/User')
var nodemailer = require('nodemailer')
const request = require('request')
const geocode = require('../utils/geocode.js')
const forecast = require('../utils/forecast.js')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kvudaweb@gmail.com',
      pass: 'kvuda1234'
    }
    
  });

function createFirstList(id_user,permanent_list){
    User.updateOne({ id: id_user }, { "permanent_list":permanent_list }).then()
    .catch(e => res.status(500).send(e))
}

module.exports = {
    // Read - returns list of questions
    read_all_qestion: function(req, res) {
        let userId="";
        let i = 0;
        for( ; i<9;i++)
            userId+= req.params.id[i];
        // console.log(userId)
        User.findOne({ id: userId }).exec()
            .then(user =>{
                res.send(user.questions)
            })
            .catch(e => res.status(500).send(e))
    },

    forget_password: function(req, res) {
        let userId="";
        let i = 0;
        for( ; i<9;i++)
            userId+= req.params.id[i];
        User.findOne({ id: userId }).exec()
            .then(user =>{
                var email = user.email
                var password = user.password
                var nam = user.name
                var mailOptions = {
                from: 'kvudaweb@gmail.com',
                to: email,
                subject: 'Your password',
                text: 'Hello'+nam+',\n \n your password is:'+password
                };

                transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
                })
            res.send('Your password hes been sent to your email')
            })
            .catch(e => res.status(500).send(e))
    }, 
    
    user_login: function(req, res) {
        var password_user = "";
        var id_user = "";
        let i = 0;
        for( ; i<8 ;i++)
            password_user+= req.params.password[i];

        while(i<req.params.password.length){
            id_user += req.params.password[i];
            i++
        }
        User.findOne({  id: id_user })
            .then(user => res.send(user.password))
            .catch(e => res.status(500).send(e))
    },
    
    send_mail: function(req, res) {
        let userId="";
        let i = 0;
        for( ; i<9;i++)
            userId+= req.params.id[i];
        // console.log(req.body.message);
        User.findOne({ id: userId }).exec()
            .then(user =>{
                // var email = user.email
                // var password = user.password
                var name = user.name
                // console.log( nam)
                var mailOptions = {
                from: 'kvudaweb@gmail.com',
                to: 'kvudaweb@gmail.com',
                subject: 'Message',
                text: 'user: '+userId+'\n name: '+name+' \n send a message:'+'\n \n'+req.body.message+'\n'+req.body.name+'\n'+req.body.phone
                };

                transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
                })
            res.send('Your message has been sent to Kvuda')
            })
            .catch(e => res.status(500).send(e))
    },
    
    // Create - add a new user
    create_user: function(req, res) {
        User.findOne({  id: req.body.id }).exec()
            .then(user => {
                if(user == null){
                    const user = new User(req.body);
                    user.save().then(user => res.status(200).send(user)
                    ).catch(e => res.status(400).send(e))
                }
                else{
                    res.status(403).send("user is exist");
                }

            }).catch(e => res.status(500).send(e))
        
    },

    updateOneQestion: function(req, res){
    User.updateOne({ id: req.params.id }, { $addToSet: { "permanent_list": req.body.dataItem} }).then(x => 
        res.status(200).send("OK")  
        ).catch(e => {res.status(400).send(e)})

    },

    addTrip: function(req, res) {
        var flag = "summer";
        var str = req.params["value"]
        var array = str.split(',');
        var myLocation = req.body.where;
        let result = [];
        let whatToTake = [];
        let arr = [];
        var laundry = req.body.laundry;
        var days = req.body.dayes;
        var amount = days;
        if(laundry.localeCompare("can_laundry")==0 && (days>5)){
            if(days % 5 == 0)
                amount = Math.floor(days / 5)
        }    
        User.findOne({ id: array[0] }).exec()
                .then(user =>{
                var genus = user.questions[0]
                var religion = user.questions[9]
                let permanent_list = user.permanent_list;
        geocode(myLocation, (error, {latitude,longitude,location}) => {
            if(error){
                console.log(error)
                res.status(403).send(error);
                // console.log(location+"vnskjjvbskjbvkjdbajdbc")
            }
            
                
            forecast(location, (error, forcData) => {
                if(error){
                    return console.log(error)
                }
                else{
                    for(var i = 1; i< array.length; i++){
                        if(array[i].localeCompare("working")==0)
                            whatToTake.push({id:"working",value:["Laptop","Laptop Charger","Vpn Keyfob","Work Cell Phone","Work Cell Phone Charger","Business Cards"]});
                        if(array[i].localeCompare("swimming")==0)  
                            whatToTake.push({id:"swimming",value:["Swimsuit","Swimsuit Coverup","Goggles","Sandals"]});
                        if(array[i].localeCompare("dinner")==0){
                            if(genus.localeCompare("Female")==0){
                                if(religion.localeCompare("Yes")==0)
                                    whatToTake.push({id:"dinner",value:["Blouse","Dress","Skirt","Dress Shoes","Jewelry","Hair Blow Dryer","Hair Products","Pantyhose","Jacket","Cardigan"]});
                                else
                                    whatToTake.push({id:"dinner",value:["Blouse","Pants","Dress","Skirt","Dress Shoes","Jewelry","Hair Blow Dryer","Hair Products","Pantyhose","Jacket","Cardigan"]});
                            }
                            else{
                                whatToTake.push({id:"dinner",value:["Blouse","Pants","Hair Products","Jacket","Cardigan"]});
                            }
                        }
                        if(array[i].localeCompare("running")==0)  
                            whatToTake.push({id:"running",value:["Running Shoes","Running Socks","Running Shorts","Running Shirt","Running Headphones","Music Player"]});
                        if(array[i].localeCompare("hiking")==0)  
                            whatToTake.push({id:"hiking",value:["Hiking Shoes","Shirts (Non-Cotton)","Pants (Non-Cotton)","Socks (Non-Cotton)","Sunglasses","Water Bottle","Hat","Sunscreen","Bug Spray","First Aid Kit","Compass","Handheld GPS"]});
                        if(array[i].localeCompare("bicycling")==0)  
                            whatToTake.push({id:"bicycling",value:["Bicycle Shoes","Helment","Sunglasses","Bicycle Shorts","Bicycle Shirt","Bicycle Light"]});
                        if(array[i].localeCompare("beach")==0)  
                            whatToTake.push({id:"beach",value:["Swimsuit","Swimsuit Coverup","Sunglasses","Sunscreen","Hat","Sandals","Beach Towel"]});
                        if(array[i].localeCompare("baby")==0)  
                            whatToTake.push({id:"baby",value:["Diapers","Changing Pad","Blankets","Plastic Bags","Diaper Rash Cream","Baby Lotion","Tissues","Pacifier","Baby Toys","Baby Clothes","Baby Socks","Baby Shoes","Baby Bib","Baby Hat","Baby Food","Plastic Utensiles"
                        ,"Baby Formula","Water And/Or Juice","Baby Bottle + Nipples","Baby Sippy Cup","Energy Snacks","Breastpump","Night Light","First Aid Kit","Baby Pain Reliever","Baby Sling Or Front Carrier","Portable Crib Or Play Yard","Inflatable Baby Bathtub",
                         "Baby Car Seat","Collapsible Stoller","Baby Birth Certificate","Baby Gas Reliever","Consent To Travel Form","Baby Sunscreen"]});
                        if(array[i].localeCompare("camping")==0)  
                            whatToTake.push({id:"camping",value:["Tent","Sleeping Bag","Sleeping Pad","Pillow","Eating Utensils","Cooking Tools","Flashlight","Headlamp","Firewood","Matches/Lighter","Camping Food","Snacks","Tick Remover","Bug Spray","Shirts (Non-Cotton)",
                            "Pants (Non-Cotton)","Socks (Non-Cotton)","First Aid Kit","Water Filter","Compass","Handheld GPS","Towel","Utility Knife","Long Underwear"]});
                        if(array[i].localeCompare("snow")==0)  
                            whatToTake.push({id:"snow",value:["Snow Jacket","Snow Pants","Snow Hat/Beanie","Sunglasses","Snow Gloves","Chapstick","Skin Moisturizer","Sunscreen","Long Underewear"]});
                        if(array[i].localeCompare("international")==0)  
                            whatToTake.push({id:"international",value:["Passport","Visa (Immigration)","Vaccination Certificates","Medical Insurance Card","Foreign Currency","Power Transformer","Check Electronics Voltages","Pen"]});
                        if(array[i].localeCompare("gym")==0)  
                            whatToTake.push({id:"gym",value:["Gym Shoes","Gym Shorts","Gym Shirt","Gym Socks","Sports Bra","Music Player","Headphones","Gym Towel","Sandals","Padlock","Water Bottle"]});
                        if(array[i].localeCompare("photography")==0)  
                            whatToTake.push({id:"photography",value:["Camera","Tripod","Monopod","Memory Cards","Batteries","Camera Charger","Batteries","Camera Bag"]});
                        if(array[i].localeCompare("motorcycling")==0)  
                            whatToTake.push({id:"motorcycling",value:["Motorcycle Jacket","Motorcycle Pants","Motorcycle Boots","Motorcycle Gloves","Helmet","Ear Plugs","Headphones","Musice Player","Shield Cleaner","Microfiber Towels","Rain Gear","Spare Gloves","Spare Sunglasses","Dry Bag For Clothing",
                        "Bungee Cords","Tool Bag","Motorcycle Tools","Tire Repair Kit","Electrical Tape","Zip Ties","JB Weld","Rescue Tape","Chain Lube","Motorcycle GPS","SPOT Beacon","Solar Charger For Gadgets","Hard Case For Gadgets","Waterproof Pouch"]});
                        if(array[i].localeCompare("business-formal")==0 || array[i].localeCompare("business-casual")==0){ 
                            whatToTake.push({id:"business-formal",value:["Suit Jacket","Work Shirt","Work Pants","Work Shoes","Work Socks","Work Belt","Formal Watch"]});
                            if(genus.localeCompare("Female")==0) 
                                whatToTake.find(a=>a.id==="business-formal").value.push("Skirt","Dress","Jewelry","Hosiery");
                        }  
                    }
                    if(forcData<=15 && forcData>=8){  //it is winter
                        if(genus.localeCompare("Female")==0 && religion.localeCompare("Yes")==0){
                            whatToTake.push({id:"general",value:["Heavy Jacket",days+" Underwear",days+" Socks - Long",amount+" Casual Shirts",amount+" Casual Skirts"]});
                        }
                        else
                            whatToTake.push({id:"general",value:["Heavy Jacket",days+" Underwear",days+" Socks - Long",amount+" Casual Shirts",amount+" Casual Pants"]});
                        flag = "winter"
                    }
                    if(forcData<8){    //it is hard winter
                        if(genus.localeCompare("Female")==0 && religion.localeCompare("Yes")==0){
                            whatToTake.push({id:"general",value:["Coat","Umbrella", "Gloves", "Scarf", "Boots",days+" Underwear", amount+" Shirts (warm)",days+" Socks (warm)"]});
                        }
                        else
                            whatToTake.push({id:"general",value:["Coat","Umbrella", "Gloves", "Scarf", "Boots",days+" Underwear", amount+" Pants (warm)", amount+" Skirts (warm)",days+" Socks (warm)"]});
                        flag = "winter"
                    }
                    if(flag.localeCompare("summer")==0){    //it is summer
                        if(genus.localeCompare("Female")==0 && religion.localeCompare("Yes")==0){
                            whatToTake.push({id:"general",value:[days+" Underwear",days+" Socks - Long",amount+" Casual Shirts",amount+" Casual Skirts"]});
                        }
                        else
                        whatToTake.push({id:"general",value:[days+" Underwear",days+" Socks - Long",amount+" Casual Shirts",amount+" Casual Pants"]});
                    }
                    if(genus.localeCompare("Female")==0) 
                        whatToTake.find(a=>a.id==="general").value.push(days+" Bra","Dress","Personal care bag");
                    whatToTake.push({id:"essential",value:["Hand Sanitizer","Extra Battery For Cell Phone","Chapstick","Wallet","Casual Watch","House Key","Skirt","Belt","Pajamas","Ear Plugs","Eye Mask",
                    "Book","Camera","Boarding Pass","Printer Trip Itinerary"]});
                    for(var i=0; i<permanent_list.length; i++)
                        whatToTake.find(a=>a.id==="essential").value.push(permanent_list[i]);
                    
                    result.push({
                        id: "data",
                        value: [location, req.body.date, forcData]
                    });
                    arr = result.concat(whatToTake);
                    res.status(200).send(arr);
                }
                      
            })
            
        })
    })
    .catch(e => res.status(500).send(e))
        
        
   } ,

   addQuestion: function(req, res) {
    var listTake = [];
    if(req.body.navigation.localeCompare('Yes')==0) {  //if you using with navigation
        listTake.push('navigation device')
    }
    if(req.body.disability.localeCompare('Yes')==0) {  //if you have a disability certificate
        listTake.push('disability certificate')
    }
    if(req.body.hearing.localeCompare('Yes')==0) {  //if you have a disability hearing
        listTake.push('hearing aid')
    }
    if(req.body.license.localeCompare('Yes')==0) {  //if you have a license
        listTake.push('license')
    }
    if(req.body.glasses.localeCompare('Yes')==0) {  //if you have a glasses
        listTake.push('glasses')
    }
    if(req.body.lenses.localeCompare('Yes')==0) {  //if you have a lenses
        listTake.push('lenses')
    }
    if(req.body.drug.localeCompare('Yes')==0) {  //if you have a drugs
        listTake.push('medication')
    }
    if(req.body.cosher.localeCompare('Yes')==0) {  //cosher
        listTake.push('kosher food')
    }
    if(req.body.religion.localeCompare('Yes')==0) {  //religion
        if(req.body.genus.localeCompare('Female')==0){
            listTake.push('Headdress')
        }
        else{
            listTake.push('Prayer Shawl','Tefillin','Kipa','Thithit')
        }
    }
    
    User.updateOne({ id: req.params.id }, { $push: { "questions":{ $each: [req.body.genus,req.body.navigation,req.body.disability,req.body.hearing, req.body.license, req.body.glasses, req.body.lenses, req.body.drug, req.body.cosher,req.body.religion]}} }).then(question => 
        {createFirstList(req.params.id,listTake)
        res.status(200).send("ok")  
        }
        ).catch(e => {res.status(400).send(e)})

},

    updateQestion: function(req, res) {
            var listTake = [];
            if(req.body.navigation.localeCompare('Yes')==0) {  //if you using with navigation
                listTake.push('navigation device')
            }
            if(req.body.disability.localeCompare('Yes')==0) {  //if you have a disability certificate
                listTake.push('disability certificate')
            }
            if(req.body.hearing.localeCompare('Yes')==0) {  //if you have a disability hearing
                listTake.push('hearing aid')
            }
            if(req.body.license.localeCompare('Yes')==0) {  //if you have a license
                listTake.push('license')
            }
            if(req.body.glasses.localeCompare('Yes')==0) {  //if you have a glasses
                listTake.push('glasses')
            }
            if(req.body.lenses.localeCompare('Yes')==0) {  //if you have a lenses
                listTake.push('lenses')
            }
            if(req.body.drug.localeCompare('Yes')==0) {  //if you have a drugs
                listTake.push('medication')
            }
            if(req.body.cosher.localeCompare('Yes')==0) {  //cosher
                listTake.push('kosher food')
            }
            if(req.body.religion.localeCompare('Yes')==0) {  //religion
                if(req.body.genus.localeCompare('Female')==0){
                    listTake.push('Headdress')
                }
                else{
                    listTake.push('Prayer Shawl','Tefillin','Kipa','Thithit')
                }
            }
        
        User.updateOne({ id: req.params.id }, { $set: { "questions": [req.body.genus,req.body.navigation,req.body.disability,req.body.hearing, req.body.license, req.body.glasses, req.body.lenses, req.body.drug, req.body.cosher,req.body.religion]} }).then(question => 
            {
            createFirstList(req.params.id,listTake)
            res.status(200).send("ok") 
            }
            ).catch(e => {res.status(400).send(e)})

    },

    


}