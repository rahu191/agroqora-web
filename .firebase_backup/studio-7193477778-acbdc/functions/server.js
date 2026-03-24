const { onRequest } = require('firebase-functions/v2/https');
  const server = import('firebase-frameworks');
  exports.ssrstudio7193477778acbd = onRequest({"region":"asia-east1"}, (req, res) => server.then(it => it.handle(req, res)));
  