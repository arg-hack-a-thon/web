import AppConfig from '../config';
import { HTTPError } from './errors';
import qs from 'query-string';

export default {

  loginUser(email, password) {
    const url = `${AppConfig.get('/api')}/auth`
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          throw new HTTPError(json.error, json.statusCode, json);
        }
        return json;
      });
  },

  fetchUser(token) {
    const url = `${AppConfig.get('/api')}/user/me`
    return fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': token
        }
      })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          throw new HTTPError(json.error, json.statusCode, json);
        }
        return json;
      });
  }


}
