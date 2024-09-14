const express = require('express');
const os = require('os');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

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
console.log('baseUrl:http://'+getIpAddress()+':3000');
