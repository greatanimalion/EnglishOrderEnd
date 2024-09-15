const express = require('express');
const os = require('os');
const bodyParse = require("body-parser");
const session = require('express-session');
const router =require('./router/index');
const app = express();
const log=console.log;
app.use(session({
    secret: 'lonely',
    cookie:{maxAge:60*1000*24*7},
    resave: false,
    saveUninitialized: false
  }));

app.use((req, res, next)=>{
   log("method:"+req.method+',url:'+req.url)
   next()
    
})

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());
app.use(router);    





app.listen(3000, () => {
    console.log('Server is running');
});



function getIpAddress() {
    const ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
        let iface = ifaces[dev];
        for (let i = 0; i < iface.length; i++) {
            let { family, address, internal } = iface[i];
            if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
                return address;
            }
        }
    }
}



console.log('baseUrl:http://' + getIpAddress() + ':3000');
