var path = require('path');
var express = require('express');
var swig = require('swig');
var hashFiles = require('hash-files');

var app = express();

var assetHashes;

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

if (process.env.NODE_ENV !== 'production') {
  var webpack = require('webpack');
  var config = require('./webpack/config.dev');
  var compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));

} else {

  assetHashes = {
    styles: hashFiles.sync({files: ['./static/styles.css']}),
    bundle: hashFiles.sync({files: ['./static/bundle.js']}),
  }

  app.use('/static', express.static('static'));
}

app.get('*', function(req, res) {
  // res.sendFile(path.join(__dirname, 'index.html'));
  res.render('index', {
    env: process.env.NODE_ENV,
    assets: assetHashes
  });
});

app.listen(process.env.PORT, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:' + process.env.PORT);
});
