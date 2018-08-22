var platform = require('platform');

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
    return 'windows';
  }

  if (linuxes.indexOf(family) >= 0) {
    return 'linux';
  }

  if (macs.indexOf(family) >= 0) {
    return 'mac';
  }

  return null;
}

exports.handler = function(event, context, callback) {
    callback(null, {
        statusCode: 200,
        body: family(event.headers['user-agent'])
    });
};

