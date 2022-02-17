const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');


app.get('/', (req, res, next) => {
    if(req.headers.host){
        let incomingDomainDetails = req.headers.host.split(".");
        let domain = '';
        let subdomain = '';
        let tld = '';
        let filePath = ''
        if(incomingDomainDetails.length == 2){
            domain = incomingDomainDetails[0];
            tld= incomingDomainDetails[1];
            filePath = 'user3'
        }
        if(incomingDomainDetails.length == 3){
            subdomain = incomingDomainDetails[0]
            domain = incomingDomainDetails[1];
            tld= incomingDomainDetails[2];
            filePath = subdomain;
        }
    
        let publishedPagesPath = path.join(__dirname, `/publishedPages/${filePath}/index.html`);
        fs.readFile(`${publishedPagesPath}`, (err, data) => {
            if(err){
                res.send(err);
            }else{
                res.set('Content-Type', 'text/html')
                res.send(data);
            }
        })
    }else{
        res.send('ok')
    }
});

app.listen(80, () => console.log('App is running'))

// Instead do export the app:
module.exports = app;
