var app = require('./app.js');
var pkg = require('./package.json');
const greenlockExpress = require('greenlock-express');
    
let config = {
    packageRoot: __dirname,
    configDir: "../create",
    packageAgent: pkg.name + '/' + pkg.version,
    maintainerEmail: 'adithyawordpres05@gmail.com',
    staging: true,
    notify: function(event, details) {
        if ('error' === event) {
            // `details` is an error object in this case
            console.error(details);
        }
    },
    
}

greenlockExpress.init(function(){
    var options = {
        cluster: false,
        packageAgent: pkg.name + '/' + pkg.version,
        maintainerEmail: 'adithyawordpres05@gmail.com',
        notify: function(ev, args) {
            console.info(ev, args);
        },
        manager: {
            module: './manager.js'
        },
        packageRoot: __dirname,
    };
    return options;
}).serve(app)





