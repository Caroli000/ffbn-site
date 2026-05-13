const axios = require('axios');

async function test() {
  try {

    const login = await axios.post('http://localhost:3001/api/admin/login', {
      username: 'admin',
      password: 'ffbn2024'
    });
    const token = login.data.token;
    console.log(' Login OK');
    console.log('   Message:', login.data.message);

    const stats = await axios.get('http://localhost:3001/api/admin/stats/list', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(' Get stats OK:', stats.status, 'items:', stats.data.data?.length);

    const actions = await axios.get('http://localhost:3001/api/admin/actions', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(' Get actions OK:', actions.status, 'items:', actions.data.data?.length || actions.data?.length);

    const events = await axios.get('http://localhost:3001/api/admin/events', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(' Get events OK:', events.status, 'items:', events.data.data?.length || events.data?.length);

    try {
      const action = await axios.post('http://localhost:3001/api/admin/actions', {
        title_fr: 'Test Action',
        title_en: 'Test Action',
        description_fr: 'Test description',
        description_en: 'Test description',
        date: '2026-03-01',
        location_fr: 'Paris',
        location_en: 'Paris',
        category: 'solidarity'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(' Create action OK:', action.status);
    } catch (err) {
      console.log('Create action error:', err.response?.status, err.response?.data?.message || err.message);
    }

    try {
      const event = await axios.post('http://localhost:3001/api/admin/events', {
        title_fr: 'Test Event',
        title_en: 'Test Event',
        description_fr: 'Test description',
        description_en: 'Test description',
        date: '2026-04-01',
        time: '14:00',
        location_fr: 'Lyon',
        location_en: 'Lyon',
        maxParticipants: 50
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(' Create event OK:', event.status);
    } catch (err) {
      console.log(' Create event error:', err.response?.status, err.response?.data?.message || err.message);
    }

    try {
      const media = await axios.get('http://localhost:3001/api/admin/media/list', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(' Get media list OK:', media.status);
      const categories = Object.keys(media.data.data).length;
      console.log('   Categories:', categories);
    } catch (err) {
      console.log(' Get media list error:', err.response?.status, err.message);
    }

  } catch (error) {
    console.log('Error:', error.message);
  }
}

test();
