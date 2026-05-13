const axios = require('axios');

async function test() {
  try {
    const login = await axios.post('http://localhost:3001/api/admin/login', {
      username: 'admin',
      password: 'ffbn2024'
    });
    const token = login.data.token;

    console.log('Testing POST /admin/stats...');
    const response = await axios.post('http://localhost:3001/api/admin/stats', {
      category: 'test',
      label_fr: 'Test Label',
      label_en: 'Test Label',
      value: 42
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Status:', response.status);
    console.log('Response:', response.data);
  } catch (error) {
    console.log('Error status:', error.response?.status);
    console.log('Error message:', error.message);
    console.log('Response data:', error.response?.data);
  }
}

test();
