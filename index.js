const express = require('express') ;
const cron = require('node-cron')
const ping = require('ping')

const locations = [
    {
        name: 'Plant 5',
        ip: '10.111.226.1',
        address: '2840 Carrier Street, Memphis, TN 38116',
        onlineStatus: true
    },
    {
        name: 'Plant 7',
        ip: '10.111.222.1',
        address: '1775 Farrish Gravel Rd, Batesville, MS 38606',
        onlineStatus: true,
    },
    {
        name: 'Plant 2',
        ip: '10.111.236.50',
        address: '10236 Millington Arlington Road, Arlington, TN 38053',
        onlineStatus: false,
    }
]


cron.schedule('10 * * * * *', function() {
    console.log('Running at the 10th second of every minute')
    locations.forEach(host => {
        ping.promise.probe(host.ip)
        .then(res => {
            if(res.alive !== host.onlineStatus){
                host.onlineStatus = !host.onlineStatus
            }
        })
    })
})

app = express()

app.get('/', (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.json(locations)
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})

