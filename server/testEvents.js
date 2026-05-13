const axios = require('axios');

async function test() {
  try {
    console.log('Testing /api/events...');
    const res = await axios.get('http://localhost:3001/api/events');
    console.log('Status:', res.status);
    console.log('Response:', JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error('Error status:', err.response?.status);
    console.error('Error data:', err.response?.data);
    console.error('Error message:', err.message);
  }
  
  try {
    console.log('\nTesting /api/events/upcoming...');
    const res2 = await axios.get('http://localhost:3001/api/events/upcoming');
    console.log('Status:', res2.status);
    console.log('Response:', JSON.stringify(res2.data, null, 2));
  } catch (err) {
    console.error('Error status:', err.response?.status);
    console.error('Error data:', err.response?.data);
    console.error('Error message:', err.message);
  }
}

test();
