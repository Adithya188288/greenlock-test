'use strict';

let db = {
    'testcdn.ml':['testcdn.ml, user1.testcdn.ml', 'user2.testcdn.ml', 'app.testcdn.ml', 'www.testcdn.ml'],
    'backupos.ml':['backupos.ml', 'user1.backupos.ml', 'user2.backupos.ml', 'user3.backupos.ml', 'www.backupos.ml']
}

module.exports.create = function() {
    return {
        find: async function({ subject, servername, renewBefore }) {
            let altnames = db[servername];
            var site = {
                subject: subject,
                altnames: altnames
            };
            return site;
        },
        set:async function({ subject, altnames, renewAt, deletedAt }){
            var site = db[opts.subject] || {};
            db[opts.subject] = Object.assign(site, opts);
        }
    };
};

