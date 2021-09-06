const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

const bodyParser = require('body-parser')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
// Import by myself
const RecordModel = require('./models/record')
const dateUtils = require('./utils/dateUtils')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(bodyParser.json())

  // db setting

  setInterval(async () => {

    const sensors = (await RecordModel.RecordApp.query(q => q.orderBy('id')).fetchAll()).serialize()

    if (sensors.length > 50000) {
      await RecordModel.RecordApp.where("id", '<', sensors[parseInt(sensors.length / 2)].id).destroy().then(_ => { })
    }

  }, 60 * 10 * 1000)

  // table: web
  app.get('/api/patients', async (req, res) => {
    const patients = await RecordModel.Record.query(q => q.limit(2).orderBy('datetime', 'DESC')).fetchAll()
    res.send(JSON.stringify(patients.serialize()))
  })

  // table: web(nurse_salary)
  app.get('/api/nurse/:month', async (req, res) => {
    let month = req.params.month
    var month2Num = parseFloat(month)
    var today= new Date();
    var yy = today.getFullYear();
    const nurse = await new RecordModel.Record().query(q => q.whereBetween('datetime',[yy + '-' + month2Num +'-01', yy + '-' + (month2Num+1) +'-1'])).fetchAll()
    res.send(JSON.stringify(nurse.serialize()))
  })

  //table: app
  app.get('/api/sensors', async (req, res) => {
    const sensors = (await RecordModel.RecordApp.query(q => q.orderBy('id')).fetchAll()).serialize()
    // if (sensors.length > 4) {
    //   await RecordModel.RecordApp.where("id", '<', sensors[parseInt(sensors.length / 2)].id).destroy().then(_ => { })
    // }
    res.send(JSON.stringify(sensors))

  })

  // table: web
  app.get('/api/patient/bed/:bedNo', async (req, res) => {
    let bedNo = req.params.bedNo
    await new RecordModel.Record().query(q => q.limit(2).where("bedNo", bedNo).orderBy('datetime', 'DESC')).fetchAll()
      .then(userModel => {
        res.send(JSON.stringify(userModel.serialize()))
      }).catch(err => {
        res.send("null")
      })
  })

  // table: app
  app.get('/api/sensor/phoneID/:phoneID', async (req, res) => {
    let phoneID = req.params.phoneID
    await new RecordModel.RecordApp().where("phoneID", phoneID).orderBy('id', 'DESC').fetch()
      .then(userModel => {
        res.send(JSON.stringify(userModel.serialize()))
      }).catch(err => {
        res.send("null")
      })
  })

  // ICU
  //http://192.168.253.1:3030/api/icu/getData/NCU11/HandoverData?token=dFY7MsjcDCDHBp4EpB45piqdtDCG
  const axios = require("axios")

  app.get("/api/getPatientData/:bedNo", async (req, res) => {
    const URL = 'http://172.20.16.251:3030/api/icu/getData/{bedNo}/HandoverData?token=dFY7MsjcDCDHBp4EpB45piqdtDCG'
    //const URL = 'http://192.168.253.1:3030/api/icu/getData/{bedNo}/HandoverData?token=dFY7MsjcDCDHBp4EpB45piqdtDCG'
    // const URL = 'http://192.168.8.254:3030/api/icu/getData/{bedNo}/HandoverData?token=dFY7MsjcDCDHBp4EpB45piqdtDCG'
    const bedNo = req.params.bedNo
    res.send((await axios(URL.replace("{bedNo}", bedNo))).data)
  })

  app.post('/api/patient', async (req, res) => {
    const data = req.body

    await RecordModel.Record.forge({
      datetime: dateUtils.getDateTimeString(new Date()),
      bedNo: data.bedNo,
      patientID: data.patientID,
      s1: data.s1,
      s2: data.s2,
      s3: data.s3,
      s4: data.s4,
      diagnosis: (data.diagnosis == "") ? "" : data.diagnosis.map(a => a.name).join(','),
      remark: (data.remark == "") ? "" : data.remark.map(a => a.name).join(','),
      nurse: data.nurse
    })
      .save()
      .then((userModel) => {
        res.send(JSON.stringify(userModel.serialize()))
      })
  })

  app.get('/api/patient/:patientID', async (req, res) => {
    let patientID = req.params.patientID
    await new RecordModel.Record({ "patientID": patientID }).fetch()
      .then(userModel => {
        res.send(JSON.stringify(userModel.serialize()))
      }).catch(err => {
        res.send("null")
      })
  })

  app.delete('/api/patient/:id', async (req, res) => {
    const id = req.params.id;

    // await new RecordModel({ "patientID": patientID }).destroy();
    let record = await new RecordModel.Record({ "id": id }).fetch()
    await record.destroy();
    res.send('del succefully')
  })

  // table: app
  app.delete('/api/sensors/:id', async (req, res) => {
    const id = req.params.id;
    console.log(req.params);
    // let record = await new RecordModel.RecordApp({ "id": id }).fetch()
    let record = await new RecordModel.RecordApp().query(q => q.limit(2).where("id", id).orderBy('id')).fetchAll()
    await record.destroy();
    res.send('del succesfully')
  })



  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
