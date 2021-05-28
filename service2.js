
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

  setTimeout(resolveTasks, 5000);

  let geoTasks = [{
    resultado: { latitud: '', longitud: '', estado: 'PROCESANDO' },
    _id: '60b03a1cacef790b7c693927',
    numero: '471',
    calle: 'Virrey liniers',
    ciudad: 'Buenos Aires',
    codigo_postal: '1206',
    provincia: 'Buenos Aires',
    pais: 'Argentina',
    __v: 0
  }]  // Define arrays of objects
  function getGeoInformation(req,res){
   geoTasks.push(req.body)                //Push a new task into tasks array
   console.log("Pushing a new task");
   console.log(req.body)
   return res.status(200).json({})
  
}


  function resolveTasks(){
if(geoTasks.length<1) return;
console.log(geoTasks.length + " task to do");
geoTasks.forEach(task=>{

askOpenStreetMap({
    format: "json",
    street: task.numero + " " + task.calle,
    city: task.ciudad,
    postalcode: task.codigo_postal,
    state: task.provincia,
    country: task.pais

})


})



  }


  const request = require('request')
  const querystring = require('querystring');
  let askOpenStreetMap = function(jsonParams){ return new Promise(function(resolve, reject) {

    jsonParams.format="json"

    const urlQueryString = querystring.stringify(jsonParams);

   console.log(urlQueryString)
    request.get('https://nominatim.openstreetmap.org/search?' + urlQueryString, (error, res, body) => {
        if (error) {
            console.log("error")
          return;
        }
        
       if(res) {
     console.log(res.body)
    return
}
      }
    )
   
})
  
}
//_______________________________________________________________________________________________________________________
