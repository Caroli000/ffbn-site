
const http = require('http');

const tests = {
  public: [
    { method: 'GET', path: '/stats', expectedStatus: 200, name: 'Statistics' },
    { method: 'GET', path: '/actions', expectedStatus: 200, name: 'Actions' },
    { method: 'GET', path: '/events', expectedStatus: 200, name: 'All Events' },
    { method: 'GET', path: '/events/upcoming', expectedStatus: 200, name: 'Upcoming Events' },
  ],
  authenticated: [
    { method: 'GET', path: '/admin/stats/list', name: 'Admin Stats List' },
    { method: 'GET', path: '/admin/actions', name: 'Admin Actions' },
    { method: 'GET', path: '/admin/events', name: 'Admin Events' },
    { method: 'GET', path: '/admin/media/list', name: 'Admin Media List' },
  ]
};

function makeRequest(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: `/api${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          body: body,
          json: () => {
            try { return JSON.parse(body); } catch { return null; }
          }
        });
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function runFullVerification() {
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║           COMPLETE WEBSITE & DATABASE VERIFICATION             ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  let publicPassed = 0;
  let authenticatedPassed = 0;
  let adminToken = null;

  try {

    console.log('📋 STEP 1: ADMIN AUTHENTICATION');
    console.log('─'.repeat(60));
    
    const loginRes = await makeRequest('POST', '/admin/login', {
      username: 'admin',
      password: 'ffbn2024'
    });

    if (loginRes.status !== 200) {
      console.log('❌ Login failed: ' + loginRes.status);
      throw new Error('Cannot get admin token');
    }

    const loginData = loginRes.json();
    adminToken = loginData.token;
    console.log('✅ Admin login successful');
    console.log(`   Token: ${adminToken ? adminToken.substring(0, 30) + '...' : 'NO TOKEN'}\n`);

    console.log('📋 STEP 2: PUBLIC ENDPOINTS VERIFICATION');
    console.log('─'.repeat(60));
    
    for (const test of tests.public) {
      const res = await makeRequest(test.method, test.path);
      const data = res.json();
      const itemCount = data?.data?.length || 0;
      
      if (res.status === test.expectedStatus) {
        console.log(`✅ ${test.name.padEnd(30)} [${res.status}] - ${itemCount} items`);
        publicPassed++;
      } else {
        console.log(`❌ ${test.name.padEnd(30)} [${res.status}] Expected ${test.expectedStatus}`);
      }
    }
    console.log(`\nResult: ${publicPassed}/${tests.public.length} passed\n`);

    console.log('📋 STEP 3: AUTHENTICATED ENDPOINTS VERIFICATION');
    console.log('─'.repeat(60));
    
    for (const test of tests.authenticated) {
      const res = await makeRequest(test.method, test.path, null, adminToken);
      const data = res.json();
      
      let itemInfo = '';
      if (data?.data?.length !== undefined) {
        itemInfo = ` - ${data.data.length} items`;
      } else if (test.path.includes('media')) {
        const catCount = Object.keys(data?.data || {}).length;
        itemInfo = ` - ${catCount} categories`;
      }
      
      if (res.status === 200) {
        console.log(`✅ ${test.name.padEnd(30)} [${res.status}]${itemInfo}`);
        authenticatedPassed++;
      } else {
        console.log(`❌ ${test.name.padEnd(30)} [${res.status}]${itemInfo}`);
      }
    }
    console.log(`\nResult: ${authenticatedPassed}/${tests.authenticated.length} passed\n`);

    console.log('📋 STEP 4: SUMMARY');
    console.log('─'.repeat(60));
    const totalTests = tests.public.length + tests.authenticated.length;
    const totalPassed = publicPassed + authenticatedPassed;
    
    console.log(`Public endpoints:       ${publicPassed}/${tests.public.length} ✅`);
    console.log(`Authenticated endpoints: ${authenticatedPassed}/${tests.authenticated.length} ✅`);
    console.log(`Total:                  ${totalPassed}/${totalTests} ✅\n`);

    if (totalPassed === totalTests) {
      console.log('╔════════════════════════════════════════════════════════════════╗');
      console.log('║              ✅ ALL TESTS PASSED - SYSTEM READY ✅             ║');
      console.log('╚════════════════════════════════════════════════════════════════╝\n');
    } else {
      process.exit(1);
    }

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

runFullVerification();
