import axios from 'axios';

const setIdHeader = (appId) => {
  appId
    ? (axios.defaults.headers.common['app-id'] = appId)
    : delete axios.defaults.headers.common['app-id'];
};
export default setIdHeader;
