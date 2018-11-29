import axios from 'axios';

class Axios {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.API_URL
    });
  }

  getInstance() {
    return this.axios;
  }

  signUp(user) {
    return this.axios.post('/auth/signup', user);
  }
}

export default new Axios();
