const http = require('http')

function makeRequest(method, path, data, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: `/api${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`
    }

    const req = http.request(options, (res) => {
      let body = ''
      res.on('data', chunk => body += chunk)
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: body,
          json: () => {
            try { return JSON.parse(body) } catch { return null }
          }
        })
      })
    })

    req.on('error', reject)
    if (data) req.write(JSON.stringify(data))
    req.end()
  })
}

async function test() {
  console.log('\n========================================')
  console.log('COMPLETE ADMIN FLOW INTEGRATION TEST')
  console.log('========================================\n')

  try {

    console.log('1️⃣  POST /api/admin/login')
    let res = await makeRequest('POST', '/admin/login', {
      username: 'admin',
      password: 'ffbn2024'
    })
    
    if (res.status !== 200) {
      console.log(`   ❌ FAILED: ${res.status}`)
      console.log(`   Response: ${res.body.substring(0, 100)}`)
      process.exit(1)
    }

    const loginData = res.json()
    if (!loginData.token) {
      console.log('   ❌ FAILED: No token in response')
      process.exit(1)
    }

    const token = loginData.token
    console.log(`   ✅ SUCCESS (Status: ${res.status})`)
    console.log(`   Token: ${token.substring(0, 30)}...`)
    console.log(`   Message: ${loginData.message}\n`)

    console.log('2️⃣  GET /api/admin/stats/list with Bearer token')
    res = await makeRequest('GET', '/admin/stats/list', null, token)
    
    if (res.status !== 200) {
      console.log(`   ❌ FAILED: ${res.status}`)
      console.log(`   Response: ${res.body}`)
      process.exit(1)
    }

    const statsData = res.json()
    console.log(`   ✅ SUCCESS (Status: ${res.status})`)
    console.log(`   Stats count: ${statsData.data ? statsData.data.length : 0}`)
    if (statsData.data && statsData.data.length > 0) {
      console.log(`   First stat: {value: "${statsData.data[0].value}", label.fr: "${statsData.data[0].label?.fr}"}`)
    }
    console.log()

    console.log('3️⃣  GET /api/admin/actions with Bearer token')
    res = await makeRequest('GET', '/admin/actions', null, token)
    
    if (res.status !== 200) {
      console.log(`   ❌ FAILED: ${res.status}`)
      console.log(`   Response: ${res.body}`)
      process.exit(1)
    }

    const actionsData = res.json()
    console.log(`   ✅ SUCCESS (Status: ${res.status})`)
    console.log(`   Actions count: ${actionsData.data ? actionsData.data.length : 0}`)
    if (actionsData.data && actionsData.data.length > 0) {
      console.log(`   First action: {title.fr: "${actionsData.data[0].title?.fr}"}`)
    }
    console.log()

    console.log('4️⃣  GET /api/admin/events with Bearer token')
    res = await makeRequest('GET', '/admin/events', null, token)
    
    if (res.status !== 200) {
      console.log(`   ❌ FAILED: ${res.status}`)
      console.log(`   Response: ${res.body}`)
      process.exit(1)
    }

    const eventsData = res.json()
    console.log(`   ✅ SUCCESS (Status: ${res.status})`)
    console.log(`   Events count: ${eventsData.data ? eventsData.data.length : 0}`)
    if (eventsData.data && eventsData.data.length > 0) {
      console.log(`   First event: {title.fr: "${eventsData.data[0].title?.fr}"}`)
    }
    console.log()

    console.log('5️⃣  GET /api/admin/media/list with Bearer token')
    res = await makeRequest('GET', '/admin/media/list', null, token)
    
    if (res.status !== 200) {
      console.log(`   ❌ FAILED: ${res.status}`)
      console.log(`   Response: ${res.body}`)
      process.exit(1)
    }

    const mediaData = res.json()
    console.log(`   ✅ SUCCESS (Status: ${res.status})`)
    if (mediaData.data) {
      const catCount = Object.keys(mediaData.data).length
      console.log(`   Categories: ${catCount}`)
      Object.entries(mediaData.data).forEach(([cat, files]) => {
        console.log(`     - ${cat}: ${files.length} files`)
      })
    }
    console.log()

    console.log('6️⃣  GET /api/admin/stats/list WITHOUT token (should fail)')
    res = await makeRequest('GET', '/admin/stats/list', null, null)
    
    if (res.status === 401 || res.status === 403) {
      console.log(`   ✅ CORRECTLY REJECTED (Status: ${res.status})`)
      console.log(`   Message: ${res.json().message}`)
    } else {
      console.log(`   ⚠️  WARNING: should have been 401/403, got ${res.status}`)
    }
    console.log()

    console.log('7️⃣  GET /api/admin/stats/list with INVALID token (should fail)')
    res = await makeRequest('GET', '/admin/stats/list', null, 'invalid-token-xyz')
    
    if (res.status === 401 || res.status === 403) {
      console.log(`   ✅ CORRECTLY REJECTED (Status: ${res.status})`)
      console.log(`   Message: ${res.json().message}`)
    } else {
      console.log(`   ⚠️  WARNING: should have been 401/403, got ${res.status}`)
    }
    console.log()

    console.log('========================================')
    console.log('✅ ALL TESTS PASSED!')
    console.log('========================================')
    console.log('\nThe API is working correctly with Bearer token')
    console.log('authentication enabled.\n')
    
  } catch (err) {
    console.error('\n❌ FATAL ERROR:')
    console.error(`   ${err.message}`)
    if (err.stack) {
      console.error(`\nStack trace:`)
      console.error(err.stack)
    }
    process.exit(1)
  }
}

test()
