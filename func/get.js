var platform = require('platform');
var latest = require('./latest.json');

var linuxes = [
  'CentOS',
  'Gentoo',
  'Kubuntu',
  'Linux Mint',
  'Linux',
  'Xubuntu',
  'Ubuntu',
  'Debian',
  'Fedora',
  'Red Hat',
  'SuSE'
];

var macs = [
  'Mac OS X',
  'OS X',
  'Mac',
  'Macintosh'
];

function family(ua) {
  var family = platform.parse(ua).os.family;

  if (/^Windows/.test(family) && family !== 'Windows Phone') {
    return 'win';
  }

  if (linuxes.indexOf(family) >= 0) {
    return 'linux';
  }

  if (macs.indexOf(family) >= 0) {
    return 'macos';
  }

  return null;
}

function extension(family) {
  return family === 'win' ? 'msi' : 'sh';
}

exports.handler = function(event, context, callback) {
  var ua = event.headers['user-agent'];
  var os = family(ua);

  //if (os === null || event.queryStringParameters['route'] === '/ua') {
  if (true) {
    return callback(null, {
      statusCode: 400,
      body: "Unrecognized operating system: " + ua + "\n\n" + JSON.stringify(event.headers, null, 2) + "\n"
    });
  }

  var ext = extension(os);

  var base = "https://github.com/notion-cli/notion/releases/download/v" + latest;
  var filename = "notion-" + latest + "-" + os + "." + ext;

  var url = base + "/" + filename;

  callback(null, {
    statusCode: 302,
    headers: {
      'Location': url
    }
  });
};
