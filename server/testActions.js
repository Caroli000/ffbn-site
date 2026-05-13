const axios = require('axios');

async function testActionsAPI() {
  const baseURL = 'http://localhost:3001/api';

  try {
    console.log('Testing GET /api/actions (FR)...');
    const res1 = await axios.get(`${baseURL}/actions`);
    console.log('Status:', res1.status);
    console.log('Response:', JSON.stringify(res1.data, null, 2));
    console.log('✅ /api/actions returned', res1.data.data?.length || 0, 'actions\n');

    console.log('Testing GET /api/actions (EN)...');
    const res2 = await axios.get(`${baseURL}/actions?lng=en`);
    console.log('Status:', res2.status);
    console.log('Response:', JSON.stringify(res2.data, null, 2));
    console.log('✅ /api/actions?lng=en returned', res2.data.data?.length || 0, 'actions\n');

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testActionsAPI();
