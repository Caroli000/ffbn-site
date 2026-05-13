const axios = require('axios');

async function test() {
  try {
    const login = await axios.post('http://localhost:3001/api/admin/login', {
      username: 'admin',
      password: 'ffbn2024'
    });
    const token = login.data.token;
    console.log('✅ Login OK\n');

    console.log('Testing CREATE action...');
    const createAction = await axios.post('http://localhost:3001/api/admin/actions', {
      title_fr: 'Test Action',
      title_en: 'Test Action',
      description_fr: 'Description test',
      description_en: 'Test desc',
      date: '2026-03-01',
      location_fr: 'Paris',
      location_en: 'Paris',
      category: 'solidarity'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Response status:', createAction.status);
    console.log('Response data:', JSON.stringify(createAction.data, null, 2));

    console.log('\nTesting GET actions...');
    const getActions = await axios.get('http://localhost:3001/api/admin/actions', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Response status:', getActions.status);
    console.log('Response has data?', !!getActions.data.data);
    console.log('First item:', getActions.data.data?.[0] ? 'exists' : 'null');

  } catch (error) {
    console.log('Error:', error.message);
    if (error.response?.data) {
      console.log('Response:', error.response.data);
    }
  }
}

test();
