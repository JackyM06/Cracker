const express = require("express")
const app = express()

app.use(require("cors")())
app.use(express.json())


app.use('/uploads',express.static(__dirname+'/uploads'))
const history = require('connect-history-api-fallback')
app.use('/admin',express.static(__dirname+'/admin'))
app.use('/', history());
app.use('/',express.static(__dirname+'/web'))



require('./plugins/db')(app)

require("./route/admin")(app)
require("./route/web")(app)

require("./script/datalog")(app)

app.set('secret','23qg344gwe%2j3fn][]aa@3')


app.listen(3000,()=>{
    console.log("http://localhost:3000")
})