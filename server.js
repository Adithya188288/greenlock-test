var app = require('./app.js');
var greenlock = require("greenlock-express");
const http01 = require('le-challenge-fs').create({ webrootPath: '/tmp/acme-challenges' });
    

const approvedDomains = ['testcdn.ml, user1.testcdn.ml', 'user2.testcdn.ml', 'app.testcdn.ml', 'www.testcdn.ml']

greenlock.create({
    server: 'https://acme-v02.api.letsencrypt.org/directory',
    approveDomains,
    app: app,
    store,
    configDir:'../certs',
  })


function checkDomain (domains, cb) {
    const userAgrees = true
    if (domains[0]) {
      if(approvedDomains.includes(domains[0])){
          cb(null, userAgrees);
      }else{
          cb(new Error('Domain not approved'))
      }
    } else {
      cb(new Error('No domain found'))
    }
}

function approveDomains (opts, certs, cb) {
    opts.challenges = { 'http-01': http01 }
    opts.email = config.email

    if (certs) {
        opts.domains = [certs.subject].concat(certs.altnames)
    }

    checkDomain(opts.domains, (err, agree) => {
        if (err) { cb(err); return }
        opts.agreeTos = agree
        cb(null, { options: opts, certs: certs })
    })
}

greenlock.listen(80, 443)