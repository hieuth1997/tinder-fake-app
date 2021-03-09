import React, { useState, useEffect } from 'react';

import axios from 'axios';
import TinderCard from '../Components/TinderCard';

function TinderPage(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get('/data/api/user', {
          params: { limit: 10 },
        });
        const { data } = response.data;
        setUsers(data);
      } catch (error) {
        console.log('fail to log data');
      }
    }
    getUsers();
  }, []);
  function getMoreUsers(page) {
    async function getUsers() {
      try {
        const response = await axios.get('/data/api/user', {
          params: { limit: 10, page: page + 1 || 1 },
        });
        const { data } = response.data;
        setUsers(data);
      } catch (error) {
        console.log('fail to log data');
      }
    }
    getUsers();
  }
  return <TinderCard users={users} getMoreUsers={getMoreUsers}></TinderCard>;
}

export default TinderPage;
