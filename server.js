var app = require('./app.js');
var greenlock = require("greenlock-express");
    
greenlock.init({
    packageRoot: __dirname,
    configDir: "../certs",
    // contact for security and critical bug notices
    maintainerEmail: "adithyawordpress05@gmail.com",
    // whether or not to run at cloudscale
    cluster: false
})
// Serves on 80 and 443
// Get's SSL certificates magically!
.serve(app);