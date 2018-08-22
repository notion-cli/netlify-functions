var ua = require('useragent');

exports.handler = function(event, context, callback) {
    var agent = ua.parse(event.headers['user-agent']);

    callback(null, {
        statusCode: 200,
        body: JSON.stringify(agent.os)
    });
};

