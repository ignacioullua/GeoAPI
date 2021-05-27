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
            
            makeServiceRequest(newGeoInfo).then(function(resolve) {    // Http POST to asking server
                return res.status(202).json({Id: newGeoInfo._id})      // If receive, give Id as response
            }, function(reject){
                newGeoInfo.delete()                                     // Avoid error if its saved but not transfered
                return res.status(400).json({error: "Service not responding, try later"}) 
            })                        
            
        }
        }).catch(error=> {res.status(400).json({error:error})})
    
    });
             
}

//_______________________________________________________________________________________________________________________

const request = require('request')
const { read } = require("fs/promises")

let makeServiceRequest = function(jsonParams){ return new Promise(function(resolve, reject) {
    
    resolve()  

    request.post('http://localhost:5001', {json: jsonParams}, (error, res, body) => {
        if (error) {
          reject()
          return
        }
        if(res.statusCode(200)) resolve()
        else reject()
      }
    ).catch(reject())
})
  
}
//_______________________________________________________________________________________________________________________


exports.getAnswerFromService = (req, res, next) => {
    

    geoInfo.find({_id : req.body.id})  // Check if already exists
    .exec()
    .then(geoInfoInDB => {
        if(geoInfoInDB.length>0 && req.body.longitud && req.body.latitud) {
geoInfoInDB[0].resultado.estado="TERMINADO"
geoInfoInDB[0].resultado.longitud = req.body.longitud
geoInfoInDB[0].resultado.latitud= req.body.latitud

geoInfo.findOneAndUpdate({_id: req.body.id}, geoInfoInDB[0], {upsert: true}, function(err, doc) {
    if (err) return res.send(500, {error: err});
    return res.send("Saved");
});

        }   else return res.status(400).json({error})
        } ).catch(error=> {return res.status(400).json({error})})
    }

//_______________________________________________________________________________________________________________________

exports.showGeoResult= (req, res, next) => {
  //    req.query.id


}

//_______________________________________________________________________________________________________________________
