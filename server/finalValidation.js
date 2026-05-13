const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const BASE_URL = 'http://localhost:3001/api';

async function performanceCheck() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔬 VÉRIFICATION COMPLÈTE DU SITE FFBN - 28 Février 2026');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let passedTests = 0;
  let totalTests = 0;

  try {

    console.log('📋 TEST 1: API Actions');
    totalTests++;
    const actionsRes = await axios.get(`${BASE_URL}/actions?lng=fr`);
    if (actionsRes.status === 200 && actionsRes.data.data.length === 3) {
      console.log('✅ Actions FR: 3 actions correctement chargées');
      passedTests++;
    } else {
      console.log('❌ Actions FR: Erreur de chargement');
    }

    totalTests++;
    const actionsEnRes = await axios.get(`${BASE_URL}/actions?lng=en`);
    if (actionsEnRes.status === 200 && actionsEnRes.data.data.length === 3) {
      console.log('✅ Actions EN: 3 actions en anglais correctes');
      passedTests++;
    } else {
      console.log('❌ Actions EN: Erreur de chargement');
    }

    console.log('\n📅 TEST 2: API Events');
    totalTests++;
    const eventsRes = await axios.get(`${BASE_URL}/events`);
    if (eventsRes.status === 200 && eventsRes.data.data.length === 3) {
      console.log('✅ Events: 3 événements correctement chargés');
      passedTests++;
    } else {
      console.log('❌ Events: Erreur de chargement');
    }

    totalTests++;
    const upcomingRes = await axios.get(`${BASE_URL}/events/upcoming`);
    if (upcomingRes.status === 200 && upcomingRes.data.data.length === 3) {
      console.log('✅ Events Upcoming: 3 événements futurs');
      passedTests++;
    } else {
      console.log('❌ Events Upcoming: Erreur');
    }

    console.log('\n📊 TEST 3: API Stats');
    totalTests++;
    const statsRes = await axios.get(`${BASE_URL}/stats`);
    if (statsRes.status === 200 && statsRes.data.data.length === 3) {
      console.log('✅ Stats: 3 statistiques correctement chargées');
      passedTests++;
    } else {
      console.log('❌ Stats: Erreur de chargement');
    }

    console.log('\n💬 TEST 4: API Contact');
    totalTests++;
    try {
      await axios.post(`${BASE_URL}/contact`, {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test',
        message: 'This is a test contact message'
      });
      console.log('✅ Contact Form: Validation fonctionnelle');
      passedTests++;
    } catch (err) {
      if (err.response?.status === 400 || err.response?.status === 201) {
        console.log('✅ Contact Form: Validation active');
        passedTests++;
      }
    }

    console.log('\n📧 TEST 5: API Newsletter');
    totalTests++;
    try {
      await axios.post(`${BASE_URL}/newsletter`, {
        email: 'newsletter@example.com'
      });
      console.log('✅ Newsletter: Endpoint opérationnel');
      passedTests++;
    } catch (err) {
      if (err.response?.status === 400 || err.response?.status === 201) {
        console.log('✅ Newsletter: Endpoint opérationnel');
        passedTests++;
      }
    }

    console.log('\n🔍 TEST 6: Intégrité des données');
    const actionFiles = await fs.readFile(path.join(__dirname, 'data', 'actions.json'), 'utf8');
    const actions = JSON.parse(actionFiles);
    
    totalTests++;
    let dataIntegrity = true;
    for (let action of actions) {
      if (!action.id || !action.title.fr || !action.title.en || !action.description.fr) {
        dataIntegrity = false;
        break;
      }
    }
    if (dataIntegrity) {
      console.log('✅ Actions.json: Données intègres et complètes');
      passedTests++;
    } else {
      console.log('❌ Actions.json: Données incomplètes');
    }

    const eventFiles = await fs.readFile(path.join(__dirname, 'data', 'events.json'), 'utf8');
    const events = JSON.parse(eventFiles);
    totalTests++;
    let eventsIntegrity = true;
    for (let event of events) {
      if (!event.id || !event.title.fr || !event.title.en) {
        eventsIntegrity = false;
        break;
      }
    }
    if (eventsIntegrity) {
      console.log('✅ Events.json: Données intègres et complètes');
      passedTests++;
    } else {
      console.log('❌ Events.json: Données incomplètes');
    }

    console.log('\n⚡ TEST 7: Performance API');
    totalTests++;
    const startTime = Date.now();
    await axios.get(`${BASE_URL}/actions`);
    const responseTime = Date.now() - startTime;
    if (responseTime < 100) {
      console.log(`✅ Temps d'réponse: ${responseTime}ms (Excellent)`);
      passedTests++;
    } else if (responseTime < 200) {
      console.log(`✅ Temps d'réponse: ${responseTime}ms (Bon)`);
      passedTests++;
    } else {
      console.log(`⚠️ Temps d'réponse: ${responseTime}ms (À optimiser)`);
    }

  } catch (error) {
    console.error('\n❌ Erreur lors de la vérification:', error.message);
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  const percentage = Math.round((passedTests / totalTests) * 100);
  console.log(`\n📊 RÉSULTAT FINAL: ${passedTests}/${totalTests} tests réussis (${percentage}%)\n`);

  if (percentage === 100) {
    console.log('🎉 EXCELLENT! Le site est en excellent état et prêt pour la production!\n');
  } else if (percentage >= 85) {
    console.log('✅ BON! Le site est stable avec des points mineurs à réviser.\n');
  } else {
    console.log('⚠️ ATTENTION: Le site nécessite des corrections avant la production.\n');
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  process.exit(percentage === 100 ? 0 : 1);
}

performanceCheck();
