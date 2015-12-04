import Confidence from 'confidence';

const criteria = {
    env: process.env.NODE_ENV
};

const config = {

  $meta: 'Our main App config',

  pkg: require('../package.json'),

  api: 'http://docker.local:8010'

}

const store = new Confidence.Store(config);

export default {
  get(key) {
    return store.get(key, criteria);
  },
  meta(key) {
    return store.meta(key, criteria);
  }
}
