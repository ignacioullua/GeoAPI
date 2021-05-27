const express = require("express")
const router = express.Router()
const processGeo = require("../Geolocalization/processGeo.js")

router.post("/geolocalizar", processGeo.checkFields, processGeo.getInfoAndSave)
router.post("/geocodificar?id=", processGeo.checkFields, processGeo.getInfoAndSave)

module.exports = router
