const express = require("express")
const router = express.Router()
const processGeo = require("../Geolocalization/processGeo.js")

router.post("/geolocalizar", processGeo.checkFields, processGeo.getInfoAndSave)
router.post("/getAnswer", processGeo.getAnswerFromService)
router.get('/geocodificar', processGeo.showGeoResult);
module.exports = router
