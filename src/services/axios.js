import axios from 'axios';

class Axios {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.API_URL
    });
    const userInfo = localStorage.getItem('mydiaryInfo');
    const user = JSON.parse(userInfo);
    if (user) {
      const { token } = user;
      this.setToken(token);
    }
  }

  getInstance() {
    return this.axios;
  }

  setToken(token) {
    this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  login(user) {
    return this.axios.post('/auth/login', user);
  }

  signUp(user) {
    return this.axios.post('/auth/signup', user);
  }

  createEntry(entry) {
    return this.axios.post('/entries', entry);
  }

  updateEntry(id, entry) {
    return this.axios.put(`/entries/${id}`, entry);
  }

  getEntryById(id) {
    return this.axios.get(`/entries/${id}`);
  }

  getEntries() {
    return this.axios.get('/entries');
  }

  deleteEntry(id) {
    return this.axios.delete(`/entries/${id}`);
  }
}

export default new Axios();
