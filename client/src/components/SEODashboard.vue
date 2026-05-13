<template>
  <div class="seo-dashboard">
    
    <div class="dashboard-header">
      <h1>📊 Tableau de Bord SEO</h1>
      <div class="header-actions">
        <button @click="refreshData" class="btn-refresh">
          🔄 Actualiser
        </button>
        <button @click="exportReport" class="btn-export">
          📥 Exporter
        </button>
      </div>
    </div>

<div class="metrics-grid">
      <div class="metric-card">
        <h3>Impressions Google</h3>
        <div class="metric-value">2,450</div>
        <p class="metric-change">+32% ce mois</p>
      </div>
      <div class="metric-card">
        <h3>Clics Organiques</h3>
        <div class="metric-value">150</div>
        <p class="metric-change">+45% ce mois</p>
      </div>
      <div class="metric-card">
        <h3>CTR Moyen</h3>
        <div class="metric-value">6.1%</div>
        <p class="metric-change">Cible: 8%</p>
      </div>
      <div class="metric-card">
        <h3>Position Moyenne</h3>
        <div class="metric-value">12</div>
        <p class="metric-change">Cible: 10</p>
      </div>
    </div>

<div class="section">
      <h2>🎯 Classements de Mots-Clés</h2>
      
      <div class="keywords-table">
        <div class="table-header">
          <div class="col-keyword">Mot-Clé</div>
          <div class="col-volume">Volume</div>
          <div class="col-difficulty">Difficulté</div>
          <div class="col-position">Position</div>
          <div class="col-trend">Tendance</div>
          <div class="col-status">Statut</div>
        </div>

        <div v-for="keyword in keywords" :key="keyword.term" class="table-row">
          <div class="col-keyword">{{ keyword.term }}</div>
          <div class="col-volume">{{ keyword.volume }}</div>
          <div class="col-difficulty">
            <div class="difficulty-bar" :style="{ width: keyword.difficulty * 10 + '%' }"></div>
            {{ keyword.difficulty }}/10
          </div>
          <div class="col-position">
            <span class="position" :class="getPositionClass(keyword.position)">
              #{{ keyword.position }}
            </span>
          </div>
          <div class="col-trend">{{ getTrendIcon(keyword.position) }}</div>
          <div class="col-status">{{ getStatusBadge(keyword.position) }}</div>
        </div>
      </div>
    </div>

<div class="section">
      <h2>📝 Performance des Articles Blog</h2>
      
      <div class="articles-performance">
        <div v-for="article in articles" :key="article.id" class="article-perf">
          <div class="article-info">
            <h3>{{ article.title }}</h3>
            <p class="category">{{ article.category }}</p>
          </div>
          <div class="article-stats">
            <div class="stat">
              <span class="stat-label">Vues</span>
              <span class="stat-value">{{ article.views }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Temps lecture moyen</span>
              <span class="stat-value">{{ article.avgTime }}m</span>
            </div>
            <div class="stat">
              <span class="stat-label">RankBrain</span>
              <span class="stat-value" :class="{ good: article.ranking > 15 }">
                {{ article.ranking > 15 ? '✅' : '⚠️' }}
              </span>
            </div>
            <button class="btn-edit">Éditer</button>
          </div>
        </div>
      </div>
    </div>

<div class="section">
      <h2>🔗 Backlinks & Autorité</h2>
      
      <div class="backlinks-stats">
        <div class="backlink-card">
          <h3>Domaines référents</h3>
          <div class="big-number">8</div>
          <p>+2 cette semaine</p>
        </div>
        <div class="backlink-card">
          <h3>Total backlinks</h3>
          <div class="big-number">12</div>
          <p>+3 cette semaine</p>
        </div>
        <div class="backlink-card">
          <h3>Score de qualité</h3>
          <div class="big-number">7/10</div>
          <p>Bon (cible: 8/10)</p>
        </div>
      </div>

      <div class="backlinks-list">
        <h3>Récents backlinks</h3>
        <div v-for="link in recentBacklinks" :key="link.id" class="backlink-item">
          <span class="source">{{ link.source }}</span>
          <span class="authority">DA: {{ link.authority }}</span>
          <span class="date">{{ formatDate(link.date) }}</span>
        </div>
      </div>
    </div>

<div class="section recommendations">
      <h2>💡 Recommandations Prioritaires</h2>
      
      <div class="recommendation-list">
        <div v-for="(rec, idx) in recommendations" :key="idx" class="recommendation-item" :class="'priority-' + rec.priority">
          <span class="priority-badge">{{ rec.priority }}</span>
          <div class="rec-content">
            <h4>{{ rec.title }}</h4>
            <p>{{ rec.description }}</p>
          </div>
          <span class="impact">+{{ rec.impact }}%</span>
        </div>
      </div>
    </div>

<div class="section goals">
      <h2>🏆 Objectifs Q1 2026</h2>
      
      <div class="goals-list">
        <div v-for="goal in goals" :key="goal.id" class="goal-item">
          <div class="goal-header">
            <h3>{{ goal.title }}</h3>
            <span class="goal-status" :class="'status-' + goal.status">{{ goal.status }}</span>
          </div>
          <div class="goal-progress">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: goal.progress + '%' }"></div>
            </div>
            <span class="progress-text">{{ goal.progress }}%</span>
          </div>
          <p class="goal-details">{{ goal.current }} / {{ goal.target }}</p>
        </div>
      </div>
    </div>

<div class="footer">
      <p>Dernière mise à jour: {{ lastUpdate }}</p>
      <p>Monitoring automatique chaque dimanche à 9h UTC</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const keywords = ref([
  { term: 'FFBN', volume: 200, difficulty: 2, position: 12, trend: '↑' },
  { term: 'Association Burundi France', volume: 150, difficulty: 4, position: 8, trend: '↑' },
  { term: 'Filles Fils Burundi', volume: 120, difficulty: 3, position: 15, trend: '→' },
  { term: 'Volontariat Burundi', volume: 90, difficulty: 4, position: 22, trend: '↓' },
  { term: 'Solidarité Burundi', volume: 80, difficulty: 6, position: 35, trend: '↓' }
]);

const articles = ref([
  { id: 1, title: '5 Actions FFBN', category: 'Actions', views: 245, avgTime: 8, ranking: 18 },
  { id: 2, title: 'Comment Devenir Bénévole', category: 'Volontariat', views: 189, avgTime: 10, ranking: 22 },
  { id: 3, title: 'Témoignage Solidarité', category: 'Témoignages', views: 312, avgTime: 12, ranking: 16 },
  { id: 4, title: 'Événement Février', category: 'Événements', views: 401, avgTime: 10, ranking: 19 },
  { id: 5, title: 'Guide SEO Association', category: 'Ressources', views: 567, avgTime: 14, ranking: 24 }
]);

const recentBacklinks = ref([
  { id: 1, source: 'pagesjaunes.fr', authority: 72, date: '2026-02-27' },
  { id: 2, source: 'annuaireasso.fr', authority: 65, date: '2026-02-26' },
  { id: 3, source: 'facebook.com/ffbn', authority: 98, date: '2026-02-25' }
]);

const recommendations = ref([
  { priority: 'HIGH', title: 'Augmenter fréquence articles', description: 'Passer de 1 à 3 articles/mois pour meilleur ranking', impact: 30 },
  { priority: 'HIGH', title: 'Construire backlinks', description: 'Créer 10 backlinks de qualité depuis domaines PA>50', impact: 40 },
  { priority: 'MEDIUM', title: 'Optimiser pages existantes', description: 'Ajouter schéma markup, améliorer H1/H2', impact: 25 },
  { priority: 'MEDIUM', title: 'Setup Google Analytics 4', description: 'Meilleur tracking et insights', impact: 20 }
]);

const goals = ref([
  { id: 1, title: 'Rang #1 pour "FFBN"', current: 12, target: 1, progress: 33, status: 'on-track' },
  { id: 2, title: '5000 impressions/mois', current: 2450, target: 5000, progress: 49, status: 'at-risk' },
  { id: 3, title: '500 clics organiques', current: 150, target: 500, progress: 30, status: 'at-risk' },
  { id: 4, title: '15 pages indexées', current: 12, target: 15, progress: 80, status: 'on-track' }
]);

const lastUpdate = ref(new Date().toLocaleString('fr-FR'));

const getPositionClass = (position) => {
  if (position <= 3) return 'top-3';
  if (position <= 10) return 'top-10';
  return 'below-10';
};

const getTrendIcon = (position) => {
  if (position < 10) return '↑';
  if (position < 20) return '→';
  return '↓';
};

const getStatusBadge = (position) => {
  if (position <= 3) return '🟢 Excellent';
  if (position <= 10) return '🟡 Bon';
  if (position <= 30) return '🟠 Moyen';
  return '🔴 À améliorer';
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR');
};

const refreshData = () => {
  lastUpdate.value = new Date().toLocaleString('fr-FR');
  alert('Données actualisées!');
};

const exportReport = () => {
  const report = {
    date: new Date().toISOString(),
    keywords,
    articles,
    backlinks: recentBacklinks
  };
  
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `seo-report-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
};

onMounted(() => {

});
</script>

<style scoped lang="css">
.seo-dashboard {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  padding: 40px 20px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dashboard-header h1 {
  font-size: 2.5em;
  margin: 0;
  color: #1e3a8a;
}

.header-actions {
  display: flex;
  gap: 15px;
}

.btn-refresh,
.btn-export {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-refresh {
  background: #3b82f6;
  color: white;
}

.btn-export {
  background: #10b981;
  color: white;
}

.btn-refresh:hover,
.btn-export:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.metric-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.metric-card h3 {
  color: #666;
  font-size: 0.95em;
  margin-bottom: 15px;
}

.metric-value {
  font-size: 2.5em;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 10px;
}

.metric-change {
  color: #10b981;
  font-size: 0.9em;
  margin: 0;
}

.section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.section h2 {
  color: #1e3a8a;
  margin-bottom: 20px;
  font-size: 1.5em;
}

.keywords-table {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1.2fr 0.8fr 1.2fr;
  gap: 15px;
  background: #f3f4f6;
  padding: 15px;
  font-weight: 600;
  color: #1e3a8a;
  border-bottom: 2px solid #e5e7eb;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1.2fr 0.8fr 1.2fr;
  gap: 15px;
  padding: 15px;
  border-bottom: 1px solid #e5e7eb;
  align-items: center;
}

.table-row:hover {
  background: #f9fafb;
}

.difficulty-bar {
  display: inline-block;
  height: 6px;
  background: #3b82f6;
  border-radius: 3px;
  margin-right: 8px;
}

.position {
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.position.top-3 {
  background: #dcfce7;
  color: #166534;
}

.position.top-10 {
  background: #fef3c7;
  color: #92400e;
}

.position.below-10 {
  background: #fee2e2;
  color: #991b1b;
}

.articles-performance {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.article-perf {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.article-info h3 {
  margin: 0 0 5px 0;
  color: #1e3a8a;
}

.category {
  color: #999;
  font-size: 0.9em;
  margin: 0;
}

.article-stats {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.stat {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.85em;
  color: #999;
  margin-bottom: 5px;
}

.stat-value {
  display: block;
  font-size: 1.4em;
  font-weight: 700;
  color: #1e3a8a;
}

.stat-value.good {
  color: #10b981;
}

.btn-edit {
  padding: 6px 12px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-edit:hover {
  background: #1e40af;
}

.backlinks-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.backlink-card {
  background: #f3f4f6;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.backlink-card h3 {
  color: #666;
  font-size: 0.95em;
  margin-bottom: 10px;
}

.big-number {
  font-size: 2.5em;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 10px;
}

.backlinks-list h3 {
  margin-bottom: 15px;
  color: #1e3a8a;
}

.backlink-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f9fafb;
  border-radius: 6px;
  margin-bottom: 10px;
  border-left: 3px solid #10b981;
}

.source {
  font-weight: 600;
  color: #1e3a8a;
}

.authority {
  color: #3b82f6;
  font-size: 0.9em;
}

.date {
  color: #999;
  font-size: 0.9em;
}

.recommendation-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.recommendation-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 20px;
  align-items: center;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.recommendation-item.priority-HIGH {
  border-left-color: #ef4444;
  background: #fef2f2;
}

.priority-badge {
  padding: 4px 10px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.85em;
  background: #3b82f6;
  color: white;
}

.recommendation-item.priority-HIGH .priority-badge {
  background: #ef4444;
}

.rec-content h4 {
  margin: 0 0 5px 0;
  color: #1e3a8a;
}

.rec-content p {
  margin: 0;
  color: #666;
  font-size: 0.9em;
}

.impact {
  font-weight: 700;
  color: #10b981;
  font-size: 1.2em;
}

.goals-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.goal-item {
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.goal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.goal-header h3 {
  margin: 0;
  color: #1e3a8a;
}

.goal-status {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.85em;
  font-weight: 600;
  background: #fef3c7;
  color: #92400e;
}

.goal-status.status-on-track {
  background: #dcfce7;
  color: #166534;
}

.goal-status.status-at-risk {
  background: #fee2e2;
  color: #991b1b;
}

.progress-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #1e40af);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.9em;
  color: #666;
  float: right;
  font-weight: 600;
}

.goal-details {
  clear: both;
  margin-top: 10px;
  font-size: 0.9em;
  color: #666;
}

.footer {
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 0.9em;
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .dashboard-header h1 {
    font-size: 1.8em;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .article-perf {
    grid-template-columns: 1fr;
  }
}
</style>
