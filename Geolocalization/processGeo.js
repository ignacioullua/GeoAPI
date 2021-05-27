//_______________________________________________________________________________________________________________________

//Validate JSON fields
const  fields = ["calle","numero","ciudad","codigo_postal","provincia","pais"]
exports.checkFields = (req, res, next) => {
    
    var keys = Object.keys(req.body)  // Getting JSON fields from POST

    fields.forEach((element,index) => {   // Checking if I have any missing
        var found = keys.find(key => key==element)
        if(found==undefined)  return res.status(400).json({error: "Check JSON fields"}); // Response with something missing
        else if(index==(fields.length-1)) next()

    })


    


}

//_______________________________________________________________________________________________________________________
const geoInfo = require("../Database/models.js");
// After validating JSONFields save it in DB and send it
exports.getInfoAndSave = (req, res, next) => {
    

    geoInfo.find(req.body)  // Check if already exists
    .exec()
    .then(geoInfoInDB => {
        if(geoInfoInDB.length>0) return res.status(400).json({error: "That request was already made, I give you the id", Id: geoInfoInDB[0]._id})
    

    const newGeoInfo = new geoInfo({  // If doesnt exists, create & try to save it
        calle: req.body.calle,
        numero: req.body.numero,
        ciudad: req.body.ciudad,
        codigo_postal: req.body.codigo_postal,
        provincia: req.body.provincia,
        pais: req.body.pais,
    });    

    newGeoInfo.save().then(result => {
        if(result){
            
            makeServiceRequest(newGeoInfo).then(function(resolve) {
                console.log(resolve)
                return res.status(202).json({Id: newGeoInfo._id})
            }, function(reject){
                console.log(reject)
                return res.status(400).json({error: "Service not responding, try later"}) 
            })                        
            
        }
        }).catch(error=> {res.status(400).json({error:error})})
    
    });
             
}

//_______________________________________________________________________________________________________________________

const https = require('https')

let makeServiceRequest = function(json){ return new Promise(function(resolve, reject) {
    
    
    var req = http.request(params, function(res) {    
    });
})
  
}
