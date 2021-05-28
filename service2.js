
var express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const router = require("./Router/routes")
const app2 = express()

const port2 = 5001

app2.listen(port2, () => {
    console.log("Listening at http://localhost:" + port2)
  })

  app2.use(bodyParser.urlencoded({ extended: false }));
  app2.use(bodyParser.json())
  app2.use('/', getGeoInformation);

  app2.use(morgan("dev"));           //DEBUG PURPOSES

  setInterval(resolveTasks, 20000);


  //_____________________________________________________________________________________________________________________
  let geoTasks = []  // Define arrays of objects //
  function getGeoInformation(req,res){
   geoTasks.push(req.body)                //Push a new task into tasks array
   console.log("Pushing a new task");
   return res.status(200).json({})
  
}

//_____________________________________________________________________________________________________________________
  function resolveTasks(){
console.log(geoTasks.length + " task to do");
if(geoTasks.length<1) return;
geoTasks.forEach(task=>{

askOpenStreetMap({
    format: "json",
    street: task.numero + " " + task.calle,
    city: task.ciudad,
    postalcode: task.codigo_postal,
    state: task.provincia,
    country: task.pais

}).then(function(resolve) {    // Http POST to asking server
   var jsonData = JSON.parse(resolve);
   if(jsonData[0]==undefined) {  //Si el motor de busqueda no lo encuentra
    latitudeValue="Not found"
    longitudeValue="Not found"
   } else {
       latitudeValue=jsonData[0].lat
       longitudeValue=jsonData[0].lon
   }

   sendBackToApi(latitudeValue,longitudeValue,task._id).then(
    function(resolve){  //If api receive, delete task 
        

        const index = geoTasks.indexOf(task);
        if (index > -1) {                                   //Delete task
          geoTasks.splice(index, 1);
        }
        

    },
    function(reject){console.log("Error")}
   )
}, function(reject){
   console.log("Try again later")
})





})



  }

//_______________________________________________________________________________________________________________________
  const request = require('request')
  const querystring = require('querystring');

  //Send info about location and fetch geocoding

  let askOpenStreetMap = function(jsonParams){ return new Promise(function(resolve, reject) {

    jsonParams.format="json"

    const urlQueryString ='https://nominatim.openstreetmap.org/search?' + querystring.stringify(jsonParams);
    
    request.get(   { 
        headers: {
        "User-Agent" : "Nodejs",
        'Content-Type': 'application/x-www-form-urlencoded'
      },uri: urlQueryString
    }, (error, res, body) => {
        if (error) {
           reject()
          return;
        }
        
       if(res.statusCode==200) {
     return resolve(res.body)
}
      }
    )
   
})
  
}
//_______________________________________________________________________________________________________________________

//When info about geocoding is ready post it to main API

let sendBackToApi =  function(latitud,longitud,id){ return new Promise(function(resolve, reject) {
    let jsonInfo = {"id": id, "latitud": latitud, "longitud": longitud }    

    request.post('http://localhost:5000/getAnswer', {json: jsonInfo}, (error, res, body) => {
        if (error) {
          reject()
          
        }
        
       if(res) {
           if(res.statusCode == 200) resolve()
       else reject()
    }
      }
    )
   
})
  
}

