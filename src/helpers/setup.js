import Axios from 'axios';

const API_HOST = 'https://dummyapi.io/';
export default () => (Axios.defaults.baseURL = API_HOST);
