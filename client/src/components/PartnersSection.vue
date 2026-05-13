<template>
  <section class="partners-section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">{{ t('partners.tag') || 'Soutiens' }}</span>
      </div>
      
      <div class="partners-grid">
        <div class="partner-card">
          <img src="../assets/images/partners/logo-lille.png" alt="Université de Lille" class="partner-logo lille-univ" />
        </div>
        <div class="partner-card">
          <img src="../assets/images/partners/logo-helloasso.png" alt="HelloAsso" class="partner-logo helloasso" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.partners-section {
  padding: 60px 0;
  background-color: #fcfcfc;
  border-top: 1px solid #eee;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-tag {
  color: var(--burundi-red);
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 2px;
  display: block;
  margin-bottom: 10px;
}

.section-header h2 {
  font-size: 2rem;
  color: #333;
}

.partners-grid {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  flex-wrap: wrap;
}

.partner-card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  transition: all 0.3s ease;
}

.partner-card:hover {
  transform: translateY(-5px) scale(1.05);
}

.partner-logo {
  max-height: 150px;
  max-width: 300px;
  object-fit: contain;
}

.lille-univ {
  max-height: 180px;
}

.helloasso {
  max-height: 90px;
}

@media (max-width: 768px) {
  .partners-grid {
    gap: 30px;
  }
  
  .partner-logo {
    max-height: 50px;
  }
}
</style>
