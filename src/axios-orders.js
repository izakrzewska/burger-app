import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-burger-6c66d.firebaseio.com/'
});

export default instance;
