var parser = require('ua-parser-js');

exports.handler = function(event, context, callback) {
    var ua = parser(event.headers['user-agent']);

    callback(null, {
        statusCode: 200,
        body: JSON.stringify(ua.os)
    });
};

